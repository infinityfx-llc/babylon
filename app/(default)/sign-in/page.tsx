import { Field, PasswordField, Button, Divider } from '@infinityfx/fluid';
import Link from 'next/link';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import styles from './page.module.css';

export default function Page() {

    return <main className={styles.main}>
        <div className={styles.form}>
            <h1 className={styles.heading}>Sign in</h1>

            <Field type="email" label="Email" icon={<IoMail />} />
            <PasswordField label="Password" icon={<IoLockClosed />} />

            <Button>
                Sign in
            </Button>

            <Divider label="Or" />

            <Link href="/sign-up" tabIndex={-1}>
                <Button variant="minimal" style={{ width: '100%' }}>
                    Create an account
                </Button>
            </Link>
        </div>
    </main>
}