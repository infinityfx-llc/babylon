import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { getSession } from '@/lib/session';
import { ApiErrors } from '@/lib/types';
import db from '@/prisma/client';

export type ReadlistData = {
    bookId: string;
};

export const POST = defineEndpoint(async (data: ReadlistData) => {
    const { user } = getSession();

    if (!user) return {
        read: undefined,
        errors: { generic: ApiErrors.noSession }
    }

    const reader = await db.reader.findUnique({
        where: {
            id: user.id,
            readBooks: {
                some: {
                    id: data.bookId
                }
            }
        }
    });

    await db.reader.update({
        where: {
            id: user.id
        },
        data: {
            readBooks: {
                connect: reader ? undefined : {
                    id: data.bookId
                },
                disconnect: reader ? {
                    id: data.bookId
                } : undefined
            }
        }
    });

    return { read: !reader };
});

export type ApiReadlist = ApiEndpoint<'/api/readlist', ReadlistData, typeof POST>;