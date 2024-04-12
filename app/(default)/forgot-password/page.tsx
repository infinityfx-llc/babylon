import { Button, Field } from '@infinityfx/fluid';
import { IoMail } from 'react-icons/io5';
import styles from './page.module.css';

export default function Page() {

    return <main className={styles.main}>
        <div className={styles.form}>
            <h1 className={styles.heading}>Forgot your password?</h1>

            <Field type="email" label="Email" icon={<IoMail />} />

            <Button>
                Request a reset
            </Button>
        </div>
    </main>;
}