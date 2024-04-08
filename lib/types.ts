export type Book = {
    id: string;
    title: string;
    author: {
        name: string;
    };
    description: string;
    releaseDate: Date;
    genre: {
        id: string;
        name: string;
    };
    rating: {
        count: number;
        value: number;
    },
    pages: number;
    language: string;
}