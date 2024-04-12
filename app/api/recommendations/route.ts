import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { getSession } from '@/lib/session';
import { Genres } from '@/lib/types';
import db from '@/prisma/client';

export type RecommendationsData = {
    genre?: 'all' | keyof typeof Genres;
};

export const POST = defineEndpoint(async (data: RecommendationsData) => {
    const { user } = getSession();

    const books = await db.book.findMany({
        where: {
            genre: data.genre !== 'all' || data.genre === undefined ? {
                id: data.genre
            } : undefined
        },
        include: {
            author: true,
            genre: true,
            readers: user ? {
                where: {
                    id: user.id
                },
                select: {
                    id: true
                }
            } : false
        }
    });

    return { books };
});

export type ApiRecommendations = ApiEndpoint<'/api/recommendations', RecommendationsData, typeof POST>;