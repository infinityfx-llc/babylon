import styles from './page.module.css';
import Link from 'next/link';
import { Button } from '@infinityfx/fluid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About'
};

export default function Page() {

    return <main className={styles.main}>
        <section className={styles.section}>
            <p>
                This is a demo project built on <Link href="https://infinityfx.dev/fluid" className={styles.link}>Fluid UI</Link>.
            </p>

            <Link href="https://infinityfx.dev" target="_blank" tabIndex={-1}>
                <Button variant="minimal">
                    Made by InfinityFX
                </Button>
            </Link>
        </section>
    </main>;
}