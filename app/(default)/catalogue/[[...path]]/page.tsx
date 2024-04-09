import Filters from './filters';
import styles from './page.module.css';
import Header from './header';
import Results from './results';

export default function Page() {

    return <main className={styles.main}>
        <section className={styles.content}>
            <Header />

            <Results />
        </section>
        
        <aside className={styles.sidebar}>
            <Filters />
        </aside>
    </main>;
}