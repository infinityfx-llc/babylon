import { ThemeToggle, Autocomplete } from '@infinityfx/fluid';
import { IoSearch } from 'react-icons/io5';
import Results from './results';
import styles from './page.module.css';

export default function Page() {

    return <main className={styles.main}>
        <section className={styles.section}>
            <h1 className={styles.title}>Find your next book</h1>

            <Autocomplete completions={[]} placeholder="Title, Author, etc.." size="lrg" round icon={<IoSearch />} />

            <Results />
        </section>
    </main>;
}