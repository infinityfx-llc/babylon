import { Autocomplete, Button } from '@infinityfx/fluid';
import { IoSearch } from 'react-icons/io5';
import Filters from './filters';
import BookResult from '@/components/book-result';
import styles from './page.module.css';

import { getAll } from '@/lib/db';
import ViewAllButton from './view-all-button';
import { Genre } from '@/lib/types';

export default function Page({ params }: { params: { path: string[]; }; }) {
    const [type, value] = params.path || [];

    const results = [
        {
            name: 'fantasy' as const,
            books: getAll()
        },
        {
            name: 'thriller' as const,
            books: getAll()
        }
    ]

    return <main className={styles.main}>
        <section className={styles.content}>
            <Autocomplete completions={[]} round placeholder="Title, Author, etc.." icon={<IoSearch />} />

            {results.map(({ name, books }) => (
                <div className={styles.results__set} key={name}>
                    <div className={styles.heading}>{Genre[name]}</div>

                    <div className={styles.list}>
                        {books.slice(0, 5).map((book, i) => <BookResult key={i} book={book} />)}
                    </div>

                    <ViewAllButton genre={name} />
                </div>
            ))}
        </section>
        
        <aside className={styles.sidebar}>
            <Filters />
        </aside>
    </main>;
}