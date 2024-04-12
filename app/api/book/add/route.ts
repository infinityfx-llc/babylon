import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { Genres } from '@/lib/types';
import { getAuthorId } from '@/lib/utils';
import db from '@/prisma/client';
import { BookType } from '@prisma/client';

export type BookAddData = {
    title: string;
    description: string;
    genre: keyof typeof Genres;
    author: {
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
        pages: number;
        language: string;
    }[];
};

export const POST = defineEndpoint(async (data: BookAddData) => {

    const authorId = getAuthorId(data.author);
    await db.author.upsert({
        where: {
            id: authorId
        },
        update: {},
        create: {
            id: authorId,
            name: data.author.name,
            fullName: data.author.fullName,
            born: new Date(data.author.born),
            died: data.author.died ? new Date(data.author.died) : null,
            nationality: data.author.nationality
        }
    });

    const editions = data.editions
        .map(edition => ({ ...edition, published: new Date(edition.published) }))
        .sort((a, b) => a.published.getTime() - b.published.getTime());

    try {
        const book = await db.book.create({
            data: {
                id: editions[0].id,
                title: data.title,
                description: data.description,
                published: editions[0].published,
                genre: {
                    connectOrCreate: {
                        where: {
                            id: data.genre
                        },
                        create: {
                            id: data.genre,
                            name: Genres[data.genre]
                        }
                    }
                },
                author: {
                    connect: { id: authorId }
                },
                editions: {
                    createMany: {
                        data: editions
                    }
                }
            }
        });

        return { book };
    } catch (ex) {

        return { book: null };
    }
});

export type ApiBookAdd = ApiEndpoint<'/api/book/add', BookAddData, typeof POST>;