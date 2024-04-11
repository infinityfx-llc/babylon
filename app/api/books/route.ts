import { ApiReturnType, Genres, Sorting } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiBooksRequest = await req.json();
    let orderBy: any = { rating: 'desc' };

    switch (data.sorting) {
        case 'latest': orderBy = { published: 'desc' };
            break;
        case 'earliest': orderBy = { published: 'asc' };
            break;
        case 'highestRated': orderBy = { rating: 'desc' };
            break;
        case 'lowestRated': orderBy = { rating: 'asc' };
            break;
    }

    const config = {
        where: {
            AND: [
                {
                    OR: data.query ? [
                        {
                            title: {
                                contains: data.query,
                                mode: 'insensitive' as const
                            }
                        },
                        {
                            author: {
                                fullName: {
                                    contains: data.query,
                                    mode: 'insensitive' as const
                                }
                            }
                        }
                    ] : undefined
                },
                {
                    OR: data.ratings?.length ? [
                        {
                            rating: {
                                gte: data.ratings[0] * 10,
                                lte: data.ratings[1] * 10
                            }
                        },
                        {
                            rating: 0
                        }
                    ] : undefined
                }
            ],
            genreId: data.genres?.length ? {
                in: data.genres
            } : undefined
        },
        include: {
            author: true,
            genre: true
        },
        orderBy
    };

    if (data.aggregate) {
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
    aggregate?: boolean;
    query?: string;
    sorting?: keyof typeof Sorting;
    genres?: (keyof typeof Genres)[];
    ratings?: number[];
};

export type ApiBooksResponse = ApiReturnType<typeof POST>;