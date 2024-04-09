'use client';

import Review from './review';
import styles from './reviews.module.css';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiReviewsRequest, ApiReviewsResponse } from '@/app/api/reviews/route';
import { formatCount } from '@/lib/utils';

export default function Reviews({ bookId }: { bookId: string; }) {
    const { data } = useSWR('/api/reviews', url => source<ApiReviewsRequest, ApiReviewsResponse>(url, { bookId }));

    return <section>
        <h3 className={styles.heading}>Reviews &bull; {formatCount(data?.reviews.length)}</h3>

        <div className={styles.list}>
            {data?.reviews.map((review, i) => <Review key={i} review={review} />)}
        </div>
    </section>
}