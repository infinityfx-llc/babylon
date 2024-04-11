import { getSession } from '@/lib/session';
import { ApiReturnType, Sorting } from '@/lib/types';
import { getOrderBy } from '@/lib/utils';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { user } = getSession();
    const data: ApiReaderBooksRequest = await req.json();

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

    if (!reader) return NextResponse.json({ books: null, results: 0 });

    return NextResponse.json({ books: reader.readBooks, results: reader._count.readBooks });
}

export type ApiReaderBooksRequest = {
    readerId: string;
    sorting?: keyof typeof Sorting;
    index?: number;
    limit?: number;
};

export type ApiReaderBooksResponse = ApiReturnType<typeof POST>;