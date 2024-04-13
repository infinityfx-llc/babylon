import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { Genres } from '@/lib/types';
import db from '@/prisma/client';
import { BookType } from '@prisma/client';

export type BookSuggestData = {
    title: string;
    description: string;
    genre: keyof typeof Genres;
    author: {
        id: string;
        name: string;
        fullName: string;
        born: Date;
        died: Date | null;
        nationality: string;
    };
    editions: {
        id: string;
        type: BookType;
        published: Date;
        cover: string;
        pages: number;
        language: string;
    }[];
};

export const POST = defineEndpoint(async (data: BookSuggestData) => {

    const suggestion = await db.bookRequest.create({
        data: {
            data
        }
    });

    return { suggestion };
});

export type ApiBookSuggest = ApiEndpoint<'/api/book/suggest', BookSuggestData, typeof POST>;