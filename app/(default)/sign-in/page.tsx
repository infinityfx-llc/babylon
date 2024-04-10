import { getSession } from '@/lib/session';
import { Button, Divider } from '@infinityfx/fluid';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoLogoFacebook, IoLogoGoogle } from 'react-icons/io';
import Form from './form';
import styles from './page.module.css';

export default function Page() {
    const { user } = getSession();

    if (user) redirect('/profile');

    return <main className={styles.main}>
        <div className={styles.form}>
            <h1 className={styles.heading}>Sign in</h1>

            <Form />

            <Link href="/forgot-password" className={styles.link}>Forgot your password?</Link>

            <Divider label="Or" />

            <Button variant="light">
                <IoLogoGoogle />
                Continue with Google
            </Button>

            <Button variant="light">
                <IoLogoFacebook />
                Continue with Facebook
            </Button>

            <Link href="/sign-up" tabIndex={-1}>
                <Button variant="neutral" style={{ width: '100%' }}>
                    Create an account
                </Button>
            </Link>
        </div>
    </main>
}