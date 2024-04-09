import { ApiReturnType, Genres } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiReviewsRequest = await req.json();


    const reviews = await db.review.findMany({
        where: {
            bookId: data.bookId
        },
        include: {
            reader: true
        }
    });

    return NextResponse.json({ reviews });
}

export type ApiReviewsRequest = {
    bookId: string;
};

export type ApiReviewsResponse = ApiReturnType<typeof POST>;