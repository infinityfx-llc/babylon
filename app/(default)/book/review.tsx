import { Button } from '@infinityfx/fluid';
import type { Reader, Review } from '@prisma/client';
import Link from 'next/link';
import { IoStar } from 'react-icons/io5';
import styles from './review.module.css';

export default function Review({ review }: { review: Review & { reader: Reader; }; }) {

    return <div className={styles.review}>
        <div className={styles.profile} />

        <div className={styles.body}>
            <div className={styles.row}>
                <Link href={`/reader/${review.reader.id}`} tabIndex={-1}>
                    <Button variant="minimal" size="sml">
                        {review.reader.firstName} {review.reader.lastName}
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