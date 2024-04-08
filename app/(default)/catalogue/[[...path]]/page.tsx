import { Autocomplete, Button } from '@infinityfx/fluid';
import { IoSearch } from 'react-icons/io5';
import Filters from './filters';
import BookResult from '@/components/book-result';
import styles from './page.module.css';

export default function Page({ params }: { params: { path: string[]; }; }) {
    const [type, value] = params.path || [];

    return <main className={styles.main}>
        <section className={styles.content}>
            <Autocomplete completions={[]} round placeholder="Title, Author, etc.." icon={<IoSearch />} />

            <div className={styles.results__set}>
                <div className={styles.heading}>Fantasy</div>

                <div className={styles.list}>
                    {new Array(5).fill(0).map((_, i) => <BookResult key={i} />)}
                </div>

                <Button variant="neutral" size="sml" round className={styles.button}>
                    View all
                </Button>
            </div>

            <div className={styles.results__set}>
                <div className={styles.heading}>Thriller</div>

                <div className={styles.list}>
                    {new Array(5).fill(0).map((_, i) => <BookResult key={i} />)}
                </div>

                <Button variant="neutral" size="sml" round className={styles.button}>
                    View all
                </Button>
            </div>
        </section>
        <aside className={styles.sidebar}>
            <Filters />
        </aside>
    </main>;
}