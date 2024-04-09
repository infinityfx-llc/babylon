import { Author, Book, Genre } from "@prisma/client";
import { NextResponse } from "next/server";

export type Filter = 'genre' | 'search';

export const Genres = {
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

export type BaseBook = Book & { genre: Genre; author: Author; };

export type ApiReturnType<T extends (args: any) => any> = Awaited<ReturnType<T>> extends NextResponse<infer T> ? T : unknown;