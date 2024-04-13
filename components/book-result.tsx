'use client';

import { Badge, Frame } from '@infinityfx/fluid';
import Image from 'next/image';
import Link from 'next/link';
import { IoStar } from 'react-icons/io5';
import styles from './book-result.module.css';
import { BaseBook } from '@/lib/types';
import ReadlistButton from './readlist-button';

export default function BookResult({ book }: { book: BaseBook; }) {

    return <div className={styles.result}>
        <Link href={`/book/${book.id}`}>
            <Frame className={styles.image} background="dark" border>
                <Image src={book.cover} fill alt={book.title} />
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

            <ReadlistButton defaultRead={!!book.readers?.length} bookId={book.id} />
        </div>
    </div>;
}