import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { getSession } from '@/lib/session';
import { Genres } from '@/lib/types';
import db from '@/prisma/client';

export type RecommendationsData = {
    genre?: 'all' | keyof typeof Genres;
};

/**
 * Retrieve a list of recommended books for the signed in user.
 */
export const POST = defineEndpoint(async (data: RecommendationsData) => {
    const { user } = getSession();

    const books = await db.book.findMany({
        where: {
            genres: data.genre !== 'all' || data.genre === undefined ? {
                some: {
                    id: data.genre
                }
            } : undefined,
            readers: user ? {
                none: {
                    id: user.id
                }
            } : undefined
        },
        include: {
            authors: true,
            genres: true,
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