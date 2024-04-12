import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { getSession } from '@/lib/session';
import { ApiErrors } from '@/lib/types';
import db from '@/prisma/client';

type BookReviewData = {
    bookId: string;
    rating: number;
    text?: string;
};

export const POST = defineEndpoint(async (data: BookReviewData) => {
    const { user } = getSession();

    if (!user) return {
        review: undefined,
        errors: { generic: ApiErrors.noSession }
    };

    const book = await db.book.findUnique({
        where: {
            id: data.bookId
        },
        include: {
            _count: true
        }
    });

    if (!book) return {
        review: undefined,
        errors: { generic: ApiErrors.noBook }
    };

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

    return { review };
});

export type ApiBookReview = ApiEndpoint<'/api/book/review', BookReviewData, typeof POST>;