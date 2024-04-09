import Results from './results';
import styles from './page.module.css';

export default function Page() {

    return <main className={styles.main}>
        <section className={styles.section}>
            <h1 className={styles.title}>Find your next book</h1>

            <Results />
        </section>
    </main>;
}