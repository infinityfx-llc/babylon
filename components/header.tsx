import { ThemeToggle } from '@infinityfx/fluid';
import Link from 'next/link';
import FontSizeToggle from './font-size-toggle';
import Logo from './logo';
import styles from './header.module.css';
import Account from './account';
import { Suspense } from 'react';
import Menu from './menu';
import Navigation from './navigation';

export default function Header() {

    return <header className={styles.header}>
        <Link href="/">
            <Logo />
        </Link>
        
        <Navigation />

        <Suspense>
            <Account />
        </Suspense>

        {/* <FontSizeToggle /> */}

        <Menu />

        <ThemeToggle round className={styles.desktop} />
    </header>
}