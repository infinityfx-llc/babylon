import Results from './results';
import styles from './page.module.css';
import { getSession } from '@/lib/session';
import Recommendations from '@/components/recommendations';

export default function Page() {
    const { user } = getSession();

    return <main className={styles.main}>
        <section className={styles.section}>
            {user && <Recommendations />}
            
            <div>
                <h1 className={styles.title}>Find your next book</h1>
                <h2 className={styles.subtitle}>Get a recommendation based on a book you like</h2>
            </div>

            <Results />
        </section>
    </main>;
}