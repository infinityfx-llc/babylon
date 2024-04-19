import { Field, PasswordField, Button } from '@infinityfx/fluid';
import { Metadata } from 'next';
import { IoMail, IoLockClosed, IoPerson, IoPeople } from 'react-icons/io5';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Sign up'
};

export default function Page() {

    return <main className={styles.main}>
        <div className={styles.form}>
            <h1 className={styles.heading}>Sign up</h1>

            <div className={styles.row}>
                <Field label="First name" icon={<IoPerson />} />
                <Field label="Last name" icon={<IoPeople />} />
            </div>
            <Field type="email" label="Email" icon={<IoMail />} />
            <PasswordField label="Password" icon={<IoLockClosed />} strengthBar />
            <PasswordField label="Repeat password" icon={<IoLockClosed />} />

            <Button>
                Sign up
            </Button>
        </div>
    </main>
}