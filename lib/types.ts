import { NextResponse } from "next/server";

export type Filter = 'genre' | 'search';

export const Genre = {
    thriller: 'Thriller',
    fantasy: 'Fantasy'
} as const;

export const Sorting = {
    trending: 'Trending',
    latest: 'Latest',
    earliest: 'Earliest',
    highestRated: 'Highest rated',
    lowestRated: 'Lowest rated'
} as const;

export type Book = {
    id: string;
    title: string;
    author: {
        name: string;
    };
    description: string;
    releaseDate: Date;
    genre: {
        id: keyof typeof Genre;
        name: typeof Genre[keyof typeof Genre]
    };
    rating: {
        count: number;
        value: number;
    },
    pages: number;
    language: string;
};

export type ApiReturnType<T extends (args: any) => any> = Awaited<ReturnType<T>> extends NextResponse<infer T> ? T : unknown;