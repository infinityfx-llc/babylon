import { Field, PasswordField, Button } from '@infinityfx/fluid';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import styles from './page.module.css';

export default function Page() {

    return <main className={styles.main}>
        <div className={styles.form}>
            <h1>Sign in</h1>

            <Field type="email" label="Email" icon={<IoMail />} />
            <PasswordField label="Password" icon={<IoLockClosed />} />

            <Button>
                Sign in
            </Button>
        </div>
    </main>
}