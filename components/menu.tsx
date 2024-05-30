'use client';

import { Button, Drawer, Sidebar, ThemeToggle } from '@infinityfx/fluid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import styles from './menu.module.css';

export default function Menu() {
    const [show, setShow] = useState(false);
    const pathname = usePathname();

    useEffect(() => setShow(false), [pathname]);

    return <>
        <Drawer
            show={show}
            onClose={() => setShow(false)}
            title={<div className={styles.header}>
                <ThemeToggle round />
            </div> as any}>
                
            <nav className={styles.links}>
                <Link href="/">
                    <Sidebar.Item label="Home" />
                </Link>
                <Link href="/catalogue">
                    <Sidebar.Item label="Catalogue" />
                </Link>
            </nav>
        </Drawer>

        <Button size="lrg"
            className={styles.button}
            onClick={() => setShow(!show)}>
            <IoMenu />
        </Button>
    </>;
}