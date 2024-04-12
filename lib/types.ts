import { Author, Book, Genre, Reader } from "@prisma/client";
import { NextResponse } from "next/server";

export type Filter = 'genre' | 'search';

export const Genres = {
    biography: 'Biography',
    comics: 'Comics',
    culinary: 'Culinary',
    fantasy: 'Fantasy',
    fiction: 'Fiction',
    history: 'History',
    horror: 'Horror',
    music: 'Music',
    phsychology: 'Psychology',
    romance: 'Romance',
    science: 'Science',
    sport: 'Sport',
    thriller: 'Thriller'
} as const;

export const Sorting = {
    trending: 'Trending',
    latest: 'Latest',
    earliest: 'Earliest',
    highestRated: 'Highest rated',
    lowestRated: 'Lowest rated'
} as const;

export const BookTypes = {
    paperback: 'Paperback',
    hardcover: 'Hardcover',
    ebook: 'eBook'
} as const;

export type BaseBook = Book & { genre: Genre; author: Author; readers: { id: string; }[]; };

export enum ApiErrors {
    noSession = 'You are not signed in.',
    noBook = 'No book was found for the given id.',
    noReader = 'No reader was found for the given id.'
}