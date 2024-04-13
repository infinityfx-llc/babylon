import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { getSession } from '@/lib/session';
import { ApiErrors, Genres } from '@/lib/types';
import { getAuthorId } from '@/lib/utils';
import db from '@/prisma/client';
import { ApiBookSuggest } from '../suggest/route';

export type BookVoteData = {
    suggestionId: number;
    action: 'accept' | 'reject';
};

export const POST = defineEndpoint(async (data: BookVoteData) => {
    const { user } = getSession();

    if (!user) return {
        book: undefined,
        errors: {
            generic: ApiErrors.noSession
        }
    };

    const request = await db.bookRequest.findUnique({
        where: {
            id: data.suggestionId
        }
    });

    if (!request) return {
        book: undefined,
        errors: {
            generic: ApiErrors.noBook
        }
    };

    if (data.action === 'reject') {
        await db.bookRequest.delete({
            where: {
                id: data.suggestionId
            }
        });

        return { book: null };
    }

    const { title, description, genre, author, editions } = request.data as any as ApiBookSuggest[1];

    const authorId = getAuthorId(author);
    await db.author.upsert({
        where: {
            id: authorId
        },
        update: {},
        create: {
            id: authorId,
            name: author.name,
            fullName: author.fullName,
            born: new Date(author.born),
            died: author.died ? new Date(author.died) : null,
            nationality: author.nationality
        }
    });

    const sortedEditions = editions
        .map(edition => ({ ...edition, published: new Date(edition.published) }))
        .sort((a, b) => a.published.getTime() - b.published.getTime());

    try {
        const [book] = await db.$transaction([
            db.book.create({
                data: {
                    id: sortedEditions[0].id,
                    title,
                    description,
                    published: editions[0].published,
                    cover: editions[0].cover,
                    genre: {
                        connectOrCreate: {
                            where: {
                                id: genre
                            },
                            create: {
                                id: genre,
                                name: Genres[genre]
                            }
                        }
                    },
                    author: {
                        connect: { id: authorId }
                    },
                    editions: {
                        createMany: {
                            data: sortedEditions
                        }
                    }
                }
            }),
            db.bookRequest.delete({
                where: {
                    id: data.suggestionId
                }
            })
        ]);

        return { book };
    } catch (ex) {

        return {
            errors: {
                generic: ApiErrors.unexpected
            }
        };
    }

});

export type ApiBookVote = ApiEndpoint<'/api/book/vote', BookVoteData, typeof POST>;