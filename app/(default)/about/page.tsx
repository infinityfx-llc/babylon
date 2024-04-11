import styles from './page.module.css';
import Link from 'next/link';
import { IoLink } from 'react-icons/io5';
import { Button } from '@infinityfx/fluid';

export default function Page() {

    return <main className={styles.main}>
        <section className={styles.section}>
            This demo is brought to you by

            <Link href="https://infinityfx.dev" target="_blank">
                <Button variant="minimal">
                    <IoLink />
                    InfinityFX
                </Button>
            </Link>
        </section>
    </main>;
}