import { Button, Frame } from '@infinityfx/fluid';
import type { Author, Book, Review } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { IoStar } from 'react-icons/io5';
import styles from './review.module.css';

export default function Review({ review }: { review: Review & { book: Book & { authors: Author[]; }; } }) {

    return <div className={styles.review}>
        <Frame className={styles.cover}>
            <Image src={`/images/${review.book.id}.jpg`} fill alt={review.book.title} />
        </Frame>

        <div className={styles.body}>
            <div className={styles.row}>
                <Link href={`/book/${review.book.id}`} tabIndex={-1}>
                    <Button variant="minimal">
                        {review.book.title} by {review.book.authors[0].name}
                    </Button>
                </Link>

                <div className={styles.date}>
                    {review.timestamp.toLocaleDateString('en', { dateStyle: 'long' })}
                </div>
            </div>

            <div className={styles.rating}>
                <IoStar /> {review.rating / 10}
            </div>

            <p className={styles.text}>
                {review.text}
            </p>
        </div>
    </div>;
}