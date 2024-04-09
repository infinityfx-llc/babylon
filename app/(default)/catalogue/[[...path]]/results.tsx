'use client';

import BookResult from '@/components/book-result';
import ViewAllButton from './view-all-button';
import styles from './results.module.css';
import { useFilterStore, useQueryStore } from '@/lib/stores';
import useFilters from './use-filters';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiBooksRequest, ApiBooksResponse } from '@/app/api/books/route';
import { Skeleton } from '@infinityfx/fluid';
import { useDebounce } from '@infinityfx/control';

export default function Results() {
    useFilters();
    const { data: filters, loaded } = useFilterStore();
    const { data: queryData } = useQueryStore();
    const debouncedQuery = useDebounce(queryData.query);

    const { data, isLoading } = useSWR(loaded ? ['/api/books', { ...filters, query: debouncedQuery }] : null, args => source<ApiBooksRequest, ApiBooksResponse>(...args));

    return <>
        {isLoading && <div className={styles.row}>
            <Skeleton h={22} w={100} />

            <div className={styles.list}>
                {new Array(5).fill(0).map((_, i) => <Skeleton key={i} style={{ aspectRatio: 3 / 5 }} />)}
            </div>

            <Skeleton h={34} w={100} radius="max" style={{ marginLeft: 'auto' }} />
        </div>}

        {data?.genres.map(({ id, name, books }) => (
            <div className={styles.row} key={name}>
                <div className={styles.heading}>{name}</div>

                <div className={styles.list}>
                    {books.slice(0, 5).map((book, i) => <BookResult key={i} book={book} />)}
                </div>

                <ViewAllButton genre={id as any} />
            </div>
        ))}
    </>
}