import { Button, NavigationMenu, ThemeToggle } from '@infinityfx/fluid';
import Link from 'next/link';
import FontSizeToggle from './font-size-toggle';
import Logo from './logo';
import styles from './header.module.css';

export default function Header() {

    return <header className={styles.header}>
        <Logo />

        <NavigationMenu Link={Link} links={[
            { label: 'Home', href: '/' },
            {
                label: 'Catalogue', href: '/catalogue', links: [
                    { label: 'Fantasy', href: '/catalogue/genre/fantasy' },
                    { label: 'Thriller', href: '/catalogue/genre/thriller' }
                ]
            }
        ]} />

        <Link href="/sign-in" tabIndex={-1} style={{ marginLeft: 'auto' }}>
            <Button variant="light" round className={styles.account}>
                My Account
            </Button>
        </Link>

        <FontSizeToggle />

        <ThemeToggle />
    </header>
}