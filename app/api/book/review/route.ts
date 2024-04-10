import { ApiReturnType, Genres, Sorting } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiBookReviewRequest = await req.json();

    try {
        const review = await db.review.create({
            data: {
                rating: data.rating,
                text: data.text,
                book: {
                    connect: {
                        id: data.bookId
                    }
                },
                reader: {
                    connect: {
                        id: 'clustxuvn0000gw0o09wel7ps'
                    }
                }
            }
        });

        return NextResponse.json({ review });
    } catch (ex) {

        return NextResponse.json({ review: null });
    }
}

export type ApiBookReviewRequest = {
    bookId: string;
    rating: number;
    text?: string;
};

export type ApiBookReviewResponse = ApiReturnType<typeof POST>;