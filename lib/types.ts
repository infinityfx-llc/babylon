export const Genre = {
    thriller: 'Thriller',
    fantasy: 'Fantasy'
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