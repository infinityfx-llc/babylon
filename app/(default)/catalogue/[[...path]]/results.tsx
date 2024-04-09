'use client';

import BookResult from '@/components/book-result';
import ViewAllButton from './view-all-button';
import styles from './results.module.css';
import { Genre } from '@/lib/types';
import { useFilterStore } from '@/lib/stores';
import useFilters from './use-filters';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiBooksRequest, ApiBooksResponse } from '@/app/api/books/route';
import { Skeleton } from '@infinityfx/fluid';

export default function Results() {
    useFilters();
    const { data: filters, loaded } = useFilterStore();

    const { data, isLoading } = useSWR(loaded ? ['/api/books', filters] : null, args => source<ApiBooksRequest, ApiBooksResponse>(...args));

    if (isLoading) return <div className={styles.row}>
        <Skeleton h={22} w={100} />

        <div className={styles.list}>
            {new Array(5).fill(0).map((_, i) => <Skeleton key={i} style={{ aspectRatio: 3 / 5 }} />)}
        </div>

        <Skeleton h={34} w={100} radius="max" style={{ marginLeft: 'auto' }} />
    </div>;

    return <>
        {data?.genres.map(({ name, books }) => (
            <div className={styles.row} key={name}>
                <div className={styles.heading}>{Genre[name]}</div>

                <div className={styles.list}>
                    {books.slice(0, 5).map((book, i) => <BookResult key={i} book={book} />)}
                </div>

                <ViewAllButton genre={name} />
            </div>
        ))}
    </>
}