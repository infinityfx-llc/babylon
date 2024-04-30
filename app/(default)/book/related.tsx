import BookResult from '@/components/book-result';
import { getSession } from '@/lib/session';
import db from '@/prisma/client';
import { Divider } from '@infinityfx/fluid';
import styles from './related.module.css';

export default async function Related({ bookId }: { bookId: string; }) {
    const { user } = getSession();

    const books = await db.book.findMany({
        where: {
            id: {
                not: bookId
            }
        },
        include: {
            authors: true,
            genres: true,
            readers: user ? {
                where: {
                    id: user.id
                },
                select: {
                    id: true
                }
            } : false
        },
        take: 5
    });

    if (!books.length) return null;

    return <section className={styles.container}>
        <Divider size="xsm" label="Similar books" labelPosition="start" />

        <div className={styles.list}>
            {books.map(book => <BookResult key={book.id} book={book} />)}
        </div>
    </section>;
}