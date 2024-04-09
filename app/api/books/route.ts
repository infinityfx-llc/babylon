import { getAll } from '@/lib/db';
import { ApiReturnType } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiBooksRequest = await req.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const genres = [
        {
            name: 'fantasy' as const,
            books: getAll()
        },
        {
            name: 'thriller' as const,
            books: getAll()
        }
    ]

    return NextResponse.json({ genres });
}

export type ApiBooksRequest = any;
export type ApiBooksResponse = ApiReturnType<typeof POST>;