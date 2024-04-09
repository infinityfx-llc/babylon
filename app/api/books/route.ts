import { ApiReturnType, Genres } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiBooksRequest = await req.json();
    const config = {
        where: {
            OR: data.query ? [
                {
                    title: {
                        contains: data.query,
                        mode: 'insensitive' as const
                    }
                },
                {
                    author: {
                        name: {
                            contains: data.query,
                            mode: 'insensitive' as const
                        }
                    }
                }
            ] : undefined,
            genreId: data.genres?.length ? {
                in: data.genres
            } : undefined,
            rating: data.ratings?.length ? {
                gte: data.ratings[0] * 10,
                lte: data.ratings[1] * 10
            } : undefined
        },
        include: {
            author: true,
            genre: true
        }
    };

    if (data.aggregrate) {
        const books = await db.book.findMany(config);

        return NextResponse.json({ books, genres: [] });
    }

    const genres = await db.genre.findMany({
        include: {
            books: config
        }
    });

    return NextResponse.json({ genres, books: [] });
}

export type ApiBooksRequest = {
    aggregrate?: boolean;
    query?: string;
    genres?: (keyof typeof Genres)[];
    ratings?: number[];
};

export type ApiBooksResponse = ApiReturnType<typeof POST>;