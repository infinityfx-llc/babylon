import { Field, PasswordField, Button, Annotation } from '@infinityfx/fluid';
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
                <Annotation label="First name">
                    <Field icon={<IoPerson />} />
                </Annotation>
                <Annotation label="Last name">
                    <Field icon={<IoPeople />} />
                </Annotation>
            </div>
            <Annotation label="Email">
                <Field type="email" icon={<IoMail />} />
            </Annotation>
            <Annotation label="Password">
                <PasswordField icon={<IoLockClosed />} strengthBar />
            </Annotation>
            <Annotation label="Repeat password">
                <PasswordField icon={<IoLockClosed />} />
            </Annotation>

            <Button>
                Sign up
            </Button>
        </div>
    </main>
}