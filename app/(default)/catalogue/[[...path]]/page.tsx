import { Autocomplete, Button } from '@infinityfx/fluid';
import { IoSearch } from 'react-icons/io5';
import Filters from './filters';
import BookResult from '@/components/book-result';
import styles from './page.module.css';

import { getAll } from '@/lib/db';

export default function Page({ params }: { params: { path: string[]; }; }) {
    const [type, value] = params.path || [];

    const results = [
        {
            name: 'Fantasy',
            books: getAll()
        },
        {
            name: 'Thriller',
            books: getAll()
        }
    ]

    return <main className={styles.main}>
        <section className={styles.content}>
            <Autocomplete completions={[]} round placeholder="Title, Author, etc.." icon={<IoSearch />} />

            {results.map(({ name, books }) => (
                <div className={styles.results__set} key={name}>
                    <div className={styles.heading}>{name}</div>

                    <div className={styles.list}>
                        {books.slice(0, 5).map((book, i) => <BookResult key={i} book={book} />)}
                    </div>

                    <Button variant="neutral" size="sml" round className={styles.button}>
                        View all
                    </Button>
                </div>
            ))}
        </section>
        
        <aside className={styles.sidebar}>
            <Filters />
        </aside>
    </main>;
}