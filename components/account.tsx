import { getSession } from '@/lib/session';
import { Button, Frame, Popover } from '@infinityfx/fluid';
import Link from 'next/link';
import styles from './account.module.css';

export default function Account() {
    const { user } = getSession();

    if (!user) return <Link href="/sign-in" tabIndex={-1} style={{ marginLeft: 'auto' }}>
        <Button variant="light" round className={styles.account}>
            My Account
        </Button>
    </Link>;

    return <Popover.Root>
        <Popover.Trigger>
            <Button variant="light" round className={styles.account}>
                My Account
            </Button>
        </Popover.Trigger>

        {/* TODO!!! */}
        <Popover.Content>
            <Frame background="light" border shadow>
                <Link href="/profile">
                    <Button variant="minimal">
                        Profile
                    </Button>
                </Link>
            </Frame>
        </Popover.Content>
    </Popover.Root>;
}