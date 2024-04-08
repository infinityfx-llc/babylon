'use client';

import { Badge, Button, Frame } from '@infinityfx/fluid';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoBookmarkOutline, IoBookmark, IoStar } from 'react-icons/io5';
import styles from './book-result.module.css';

export default function BookResult() {
    const [bookmarked, setBookmarked] = useState(false);

    return <div className={styles.result}>
        <Link href="/book/the-lord-of-the-rings" style={{ flexGrow: 1 }}>
            <Frame className={styles.image}>
                <Image src="/images/the-lord-of-the-rings.jpg" fill />

                <div className={styles.focus} />
            </Frame>
        </Link>
        <div className={styles.row}>
            <Badge color="var(--f-clr-fg-200)">Fantasy</Badge>
            <span className={styles.rating}>
                <IoStar /> 10.0
            </span>
        </div>
        <div className={styles.row}>
            <div>
                <div className={styles.title}>The lord of the rings</div>
                <div className={styles.author}>By J.R.R. Tolkien</div>
            </div>

            <Button variant="minimal" round size="lrg" onClick={() => setBookmarked(!bookmarked)}>
                {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
            </Button>
        </div>
    </div>;
}