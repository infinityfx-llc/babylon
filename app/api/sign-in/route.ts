import { ApiReturnType } from '@/lib/types';
import db from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiSignInRequest = await req.json();

    const user = await db.reader.findUnique({
        where: {
            email: 'john@doe.com'
        }
    });

    const response = NextResponse.json({ user });
    response.cookies.set('session', JSON.stringify(user));

    return response;
}

export type ApiSignInRequest = {
    
};

export type ApiSignInResponse = ApiReturnType<typeof POST>;