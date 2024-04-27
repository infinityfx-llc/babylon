import { ApiBookSuggest } from '@/app/api/book/suggest/route';
import { getSession } from '@/lib/session';
import { Genres } from '@/lib/types';
import db from '@/prisma/client';
import { notFound, redirect } from 'next/navigation';
import BookOverview from '../book-overview';
import styles from './page.module.css';

export default async function Page() {
    const { user } = getSession();

    if (!user) return redirect('/sign-in');

    const book = await db.bookRequest.findFirst();

    if (!book || !user.admin) return notFound();
    
    const request = book.data as any as ApiBookSuggest[1];
    const editionData = request.editions[0];

    const edition = {
        ...editionData,
        bookId: editionData.id,
        editionOf: {
            id: editionData.id,
            title: request.title,
            description: request.description,
            published: editionData.published,
            cover: editionData.cover,
            rating: 0,
            authorId: request.author.id,
            author: request.author,
            genreId: request.genre,
            genre: {
                id: request.genre,
                name: Genres[request.genre]
            },
            editions: request.editions.map(data => ({
                ...data,
                bookId: editionData.id
            })),
            _count: {
                reviews: 0
            }
        }
    };

    return <main className={styles.main}>
        <BookOverview edition={edition} review={book.id} />
    </main>;
}