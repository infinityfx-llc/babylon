import { NextResponse } from 'next/server';

type EndpointResponseType<T extends (args: any) => any> = Awaited<ReturnType<T>> extends NextResponse<infer T> ? T : unknown;

export type ApiEndpoint<P extends string, D extends { [key: string]: any; }, F extends (args: any) => any> = [P, D, EndpointResponseType<F>];

export function defineEndpoint<K, T extends { [key: string]: any; }>(
    handler: (data: T) => Promise<K & {
        errors?: {
            [key in keyof T | 'generic']?: string;
        }
    }>) {

    return async (request: Request) => {
        const data = await request.json();
        const response = await handler(data);

        return NextResponse.json(response);
    };
};

