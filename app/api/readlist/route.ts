import { getSession } from '@/lib/session';
import { ApiReturnType } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { user } = getSession();
    const data: ApiReadlistRequest = await req.json();

    if (!user) return NextResponse.json({ read: null });

    const reader = await db.reader.findUnique({
        where: {
            id: user.id,
            readBooks: {
                some: {
                    id: data.bookId
                }
            }
        }
    });

    await db.reader.update({
        where: {
            id: user.id
        },
        data: {
            readBooks: {
                connect: reader ? undefined : {
                    id: data.bookId
                },
                disconnect: reader ? {
                    id: data.bookId
                } : undefined
            }
        }
    });

    return NextResponse.json({ read: !reader });
}

export type ApiReadlistRequest = {
    bookId: string;
};

export type ApiReadlistResponse = ApiReturnType<typeof POST>;