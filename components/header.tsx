import { Cull, NavigationMenu, ThemeToggle } from '@infinityfx/fluid';
import Link from 'next/link';
import FontSizeToggle from './font-size-toggle';
import Logo from './logo';
import styles from './header.module.css';
import { Genres } from '@/lib/types';
import Account from './account';
import { Suspense } from 'react';

export default function Header() {

    return <header className={styles.header}>
        <Link href="/">
            <Logo />
        </Link>

        <Cull include={['mob', 'tab']}>
            <NavigationMenu Link={Link} links={[
                { label: 'Home', href: '/' },
                {
                    label: 'Catalogue', href: '/catalogue', links: Object.entries(Genres).map(([value, name]) => ({
                        label: name,
                        href: `/catalogue/genre/${value}`
                    }))
                }
            ]} />
        </Cull>

        <Suspense>
            <Account />
        </Suspense>

        {/* <FontSizeToggle /> */}

        <Cull include={['mob', 'tab']}>
            <ThemeToggle round />
        </Cull>
    </header>
}