import BookResult from '@/components/book-result';
import { Button } from '@infinityfx/fluid';
import Link from 'next/link';
import styles from './results.module.css';

import { getAll } from '@/lib/db';

export default function Results() {

    const books = getAll().slice(0, 10);

    return <div className={styles.wrapper}>
        <h2 className={styles.heading}>Results [12]</h2>

        <div className={styles.list}>
            {books.map((book, i) => <BookResult key={i} book={book} />)}
        </div>

        <Link href="/catalogue/search" tabIndex={-1} style={{ marginLeft: 'auto' }}>
            <Button variant="neutral" round className={styles.view__all}>
                View all
            </Button>
        </Link>
    </div>
}