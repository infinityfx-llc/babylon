import { getSession } from '@/lib/session';
import { Button } from '@infinityfx/fluid';
import Link from 'next/link';
import AccountMenu from './account-menu';
import styles from './account.module.css';

export default function Account() {
    const { user } = getSession();

    if (!user) return <Link href="/sign-in" tabIndex={-1} style={{ marginLeft: 'auto' }}>
        <Button variant="light" round className={styles.account}>
            My Account
        </Button>
    </Link>;

    return <AccountMenu name={`${user.firstName.charAt(0)}. ${user.lastName}`}>
        <Button variant="light" round className={styles.account}>
            My Account
        </Button>
    </AccountMenu>;
}