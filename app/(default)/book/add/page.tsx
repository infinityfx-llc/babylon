import db from '@/prisma/client';
import Form from './form';
import styles from './page.module.css';

export default async function Page() {
    const authors = await db.author.findMany();

    return <main className={styles.main}>
        <section className={styles.section}>
            <h1>Request addition of a new book</h1>

            <Form authors={authors} />
        </section>
    </main>;
}