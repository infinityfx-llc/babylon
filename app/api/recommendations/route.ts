import { ApiReturnType, Genres, Sorting } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiRecommendationsRequest = await req.json();
    
    const books = await db.book.findMany({
        where: {
            genre: data.genre !== 'all' || data.genre === undefined ? {
                id: data.genre
            } : undefined
        },
        include: {
            author: true,
            genre: true
        }
    });

    return NextResponse.json({ books });
}

export type ApiRecommendationsRequest = {
    genre?: 'all' | keyof typeof Genres;
};

export type ApiRecommendationsResponse = ApiReturnType<typeof POST>;