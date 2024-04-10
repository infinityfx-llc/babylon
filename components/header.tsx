import { Button, NavigationMenu, ThemeToggle } from '@infinityfx/fluid';
import Link from 'next/link';
import FontSizeToggle from './font-size-toggle';
import Logo from './logo';
import styles from './header.module.css';
import { Genres } from '@/lib/types';
import Account from './account';

export default function Header() {

    return <header className={styles.header}>
        <Link href="/">
            <Logo />
        </Link>

        <NavigationMenu Link={Link} links={[
            { label: 'Home', href: '/' },
            {
                label: 'Catalogue', href: '/catalogue', links: Object.entries(Genres).map(([value, name]) => ({
                    label: name,
                    href: `/catalogue/genre/${value}`
                }))
            }
        ]} />

        <Account />

        <FontSizeToggle />

        <ThemeToggle />
    </header>
}