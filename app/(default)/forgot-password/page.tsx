import { Annotation, Button, Field } from '@infinityfx/fluid';
import { Metadata } from 'next';
import { IoMail } from 'react-icons/io5';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Forgot password'
};

export default function Page() {

    return <main className={styles.main}>
        <div className={styles.form}>
            <h1 className={styles.heading}>Forgot your password?</h1>

            <Annotation label="Email">
                <Field type="email" icon={<IoMail />} />
            </Annotation>

            <Button>
                Request a reset
            </Button>
        </div>
    </main>;
}