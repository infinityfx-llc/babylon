import { ApiReturnType } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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
                },
                take: data.limit || 10,
                skip: (data.index || 0) * (data.limit || 10)
            }
        }
    });

    if (!reader) return NextResponse.json({ books: null, results: 0 });

    return NextResponse.json({ books: reader.readBooks, results: reader._count.readBooks });
}

export type ApiReaderBooksRequest = {
    readerId: string;
    index?: number;
    limit?: number;
};

export type ApiReaderBooksResponse = ApiReturnType<typeof POST>;