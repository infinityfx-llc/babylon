import { ApiReturnType, Genres } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiReviewsRequest = await req.json();

    const reviews = await db.review.findMany({
        where: {
            bookId: data.bookId,
            rating: data.ratings?.length ? {
                gte: data.ratings[0] * 10,
                lte: data.ratings[1] * 10
            } : undefined
        },
        include: {
            reader: true
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    return NextResponse.json({ reviews });
}

export type ApiReviewsRequest = {
    bookId: string;
    ratings?: number[];
};

export type ApiReviewsResponse = ApiReturnType<typeof POST>;