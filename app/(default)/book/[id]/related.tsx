import BookResult from '@/components/book-result';
import db from '@/prisma/client';
import styles from './related.module.css';

export default async function Related({ bookId }: { bookId: string; }) {
    const books = await db.book.findMany({
        where: {
            id: {
                not: bookId
            }
        },
        include: {
            author: true,
            genre: true
        }
    });

    return <section>
        <h3 className={styles.heading}>Similar books</h3>

        <div className={styles.list}>
            {books.map(book => <BookResult key={book.id} book={book} />)}
        </div>
    </section>
}