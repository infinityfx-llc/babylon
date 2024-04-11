import { getSession } from '@/lib/session';
import { ApiReturnType } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { user } = getSession();
    const data: ApiBookReviewRequest = await req.json();

    const book = await db.book.findUnique({
        where: {
            id: data.bookId
        },
        include: {
            _count: true
        }
    });

    if (!book || !user) return NextResponse.json({ review: null });
    const ratings = book._count.reviews + 1;

    const [review] = await db.$transaction([
        db.review.create({
            data: {
                rating: data.rating,
                text: data.text || null,
                book: {
                    connect: {
                        id: data.bookId
                    }
                },
                reader: {
                    connect: {
                        id: user.id
                    }
                }
            }
        }),
        db.book.update({
            where: {
                id: data.bookId
            },
            data: {
                rating: book.rating * (ratings - 1) / ratings + data.rating / 10 / ratings
            }
        })
    ]);

    return NextResponse.json({ review });
}

export type ApiBookReviewRequest = {
    bookId: string;
    rating: number;
    text?: string;
};

export type ApiBookReviewResponse = ApiReturnType<typeof POST>;