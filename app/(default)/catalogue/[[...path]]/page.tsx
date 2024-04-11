import { Frame } from '@infinityfx/fluid';
import { Metadata } from 'next';
import Filters from './filters';
import Header from './header';
import styles from './page.module.css';
import Results from './results';

export const metadata: Metadata = {
    title: 'Catalogue'
};

export default function Page() {

    return <main className={styles.main}>
        <section className={styles.content}>
            <Header />

            <Results />
        </section>

        <aside className={styles.sidebar}>
            <Frame className={styles.container} background="light" border>
                <Filters />
            </Frame>
        </aside>
    </main>;
}