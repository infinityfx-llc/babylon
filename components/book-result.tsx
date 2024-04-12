'use client';

import { Badge, Button, Frame, Tooltip } from '@infinityfx/fluid';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoBookmarkOutline, IoBookmark, IoStar } from 'react-icons/io5';
import styles from './book-result.module.css';
import { BaseBook } from '@/lib/types';
import { source } from '@/lib/request';
import { ApiReadlist } from '@/app/api/readlist/route';

export default function BookResult({ book }: { book: BaseBook; }) {
    const [bookmarked, setBookmarked] = useState(!!book.readers?.length);

    async function toggleRead() {
        setBookmarked(!bookmarked);

        const { read, errors } = await source<ApiReadlist>('/api/readlist', { bookId: book.id });

        if (errors) {
            setBookmarked(false);
            
            if (errors.generic) alert(errors.generic);
        } else {
            setBookmarked(read);
        }
    }

    return <div className={styles.result}>
        <Link href={`/book/${book.id}`}>
            <Frame className={styles.image} background="dark" border>
                <Image src={`/images/${book.id}.jpg`} fill alt={book.title} />
            </Frame>
        </Link>

        <div className={styles.row}>
            <Badge color="var(--f-clr-fg-200)">{book.genre.name}</Badge>
            <span className={styles.rating}>
                <IoStar /> {book.rating.toFixed(1)}
            </span>
        </div>

        <div className={styles.row} style={{ marginTop: 'auto' }}>
            <div>
                <div className={styles.title}>{book.title}</div>
                <div className={styles.author}>By {book.author.name}</div>
            </div>

            <Tooltip content={bookmarked ? 'Unmark as read' : 'Mark as read'}>
                <Button variant="minimal" round size="lrg" onClick={toggleRead}>
                    {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                </Button>
            </Tooltip>
        </div>
    </div>;
}