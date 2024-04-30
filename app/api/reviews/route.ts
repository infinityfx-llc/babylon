import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import db from '@/prisma/client';

export type ReviewsData = {
    bookId: string;
    ratings?: number[];
};

/**
 * Retrieve a list of reviews for a given book.
 */
export const POST = defineEndpoint(async (data: ReviewsData) => {
    const reviews = await db.review.findMany({
        where: {
            bookId: data.bookId,
            rating: data.ratings?.length ? {
                gte: data.ratings[0] * 10,
                lte: data.ratings[1] * 10
            } : undefined,
            text: {
                not: null
            }
        },
        include: {
            reader: true
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    return { reviews };
});

export type ApiReviews = ApiEndpoint<'/api/reviews', ReviewsData, typeof POST>;