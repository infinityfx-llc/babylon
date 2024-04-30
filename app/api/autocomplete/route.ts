import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import db from '@/prisma/client';

type AutocompleteData = {
    query: string;
};

/**
 * Autocomplete a search query based on matching book titles.
 */
export const POST = defineEndpoint(async (data: AutocompleteData) => {
    const suggestions = await db.book.findMany({
        where: {
            title: {
                startsWith: data.query,
                mode: 'insensitive'
            }
        },
        select: {
            title: true
        },
        take: 10
    });

    return { suggestions };
});

export type ApiAutocomplete = ApiEndpoint<'/api/autocomplete', AutocompleteData, typeof POST>;