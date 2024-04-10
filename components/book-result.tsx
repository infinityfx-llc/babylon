'use client';

import { Badge, Button, Frame, Tooltip } from '@infinityfx/fluid';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoBookmarkOutline, IoBookmark, IoStar } from 'react-icons/io5';
import styles from './book-result.module.css';
import { BaseBook } from '@/lib/types';

export default function BookResult({ book }: { book: BaseBook; }) {
    const [bookmarked, setBookmarked] = useState(false);

    return <div className={styles.result}>
        <Link href={`/book/${book.id}`} style={{ flexGrow: 1 }}>
            <Frame className={styles.image}>
                <Image src={`/images/${book.id}.jpg`} fill alt={book.title} />
            </Frame>
        </Link>
        <div className={styles.row}>
            <Badge color="var(--f-clr-fg-200)">{book.genre.name}</Badge>
            <span className={styles.rating}>
                <IoStar /> {book.rating / 10}
            </span>
        </div>
        <div className={styles.row}>
            <div>
                <div className={styles.title}>{book.title}</div>
                <div className={styles.author}>By {book.author.name}</div>
            </div>

            <Tooltip content={bookmarked ? 'Unmark as read' : 'Mark as read'}>
                <Button variant="minimal" round size="lrg" onClick={() => setBookmarked(!bookmarked)}>
                    {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                </Button>
            </Tooltip>
        </div>
    </div>;
}