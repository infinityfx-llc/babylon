import { ApiReturnType } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data: ApiSignOutRequest = await req.json();

    const response = NextResponse.json({ user: null });
    response.cookies.delete('session');

    return response;
}

export type ApiSignOutRequest = {
    
};

export type ApiSignOutResponse = ApiReturnType<typeof POST>;