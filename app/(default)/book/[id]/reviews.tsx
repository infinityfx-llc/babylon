'use client';

import Review from './review';
import styles from './reviews.module.css';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiReviewsRequest, ApiReviewsResponse } from '@/app/api/reviews/route';
import { formatCount } from '@/lib/utils';
import { Slider, Spinner } from '@infinityfx/fluid';
import { useState } from 'react';
import WriteReview from './write-review';

export default function Reviews({ bookId }: { bookId: string; }) {
    const [ratings, setRatings] = useState([1, 10]);

    const { data, isLoading, mutate } = useSWR(['/api/reviews', { bookId, ratings }], args => source<ApiReviewsRequest, ApiReviewsResponse>(...args));

    return <>
        <WriteReview bookId={bookId} mutate={mutate} />

        <section>
            <div className={styles.header}>
                <h3 className={styles.heading}>Reviews &bull; {formatCount(data?.reviews.length)}</h3>

                <Slider min={1} max={10} step={1} handles={2} tooltips="always"
                    formatTooltip={val => `${val} star${val > 1 ? 's' : ''}`}
                    style={{ paddingBottom: 'var(--f-spacing-lrg)' }}
                    value={ratings}
                    onChange={setRatings} />
            </div>

            <div className={styles.list}>
                {isLoading && <div className={styles.loader}>
                    <Spinner />
                </div>}

                {data?.reviews.map((review, i) => <Review key={i} review={review} />)}
            </div>
        </section>
    </>;
}