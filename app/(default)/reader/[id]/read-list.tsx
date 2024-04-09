import BookResult from '@/components/book-result';
import db from '@/prisma/client';
import { Pagination } from '@infinityfx/fluid';
import styles from './read-list.module.css';

export default async function ReadList() {

    const books = await db.book.findMany({
        include: {
            author: true,
            genre: true
        }
    });

    return <section className={styles.wrapper}>
        <h2 className={styles.heading}>Recently read books</h2>

        <div className={styles.list}>
            {books.map(book => <BookResult key={book.id} book={book} />)}
        </div>

        <Pagination pages={3} style={{ marginLeft: 'auto' }} />
    </section>
}