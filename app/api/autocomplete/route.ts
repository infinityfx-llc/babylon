import { ApiReturnType } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiAutocompleteRequest = await req.json();
    
    const suggestions = await db.book.findMany({
        where: {
            title: {
                startsWith: data.query,
                mode: 'insensitive'
            }
        },
        select: {
            title: true
        },
        take: 10
    });

    return NextResponse.json({ suggestions });
}

export type ApiAutocompleteRequest = {
    query: string;
};

export type ApiAutocompleteResponse = ApiReturnType<typeof POST>;