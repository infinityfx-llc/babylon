import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { getSession } from '@/lib/session';
import { ApiErrors, Sorting } from '@/lib/types';
import { getOrderBy } from '@/lib/utils';
import db from '@/prisma/client';

export type ReaderBooksData = {
    readerId: string;
    sorting?: keyof typeof Sorting;
    index?: number;
    limit?: number;
};

export const POST = defineEndpoint(async (data: ReaderBooksData) => {
    const { user } = getSession();

    const reader = await db.reader.findUnique({
        where: {
            id: data.readerId
        },
        include: {
            _count: true,
            readBooks: {
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
                },
                take: data.limit || 10,
                skip: (data.index || 0) * (data.limit || 10),
                orderBy: getOrderBy(data.sorting)
            }
        }
    });

    if (!reader) return {
        books: undefined, 
        results: undefined,
        errors: {
            generic: ApiErrors.noReader
        }
    };

    return {
        errors: undefined,
        books: reader.readBooks,
        results: reader._count.readBooks
    };
});

export type ApiReaderBooks = ApiEndpoint<'/api/reader/books', ReaderBooksData, typeof POST>;