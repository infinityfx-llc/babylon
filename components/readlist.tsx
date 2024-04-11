'use client';

import BookResult from '@/components/book-result';
import { Pagination, Select, Skeleton } from '@infinityfx/fluid';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiReaderBooksRequest, ApiReaderBooksResponse } from '@/app/api/reader/books/route';
import { useState } from 'react';
import styles from './readlist.module.css';
import { Sorting } from '@/lib/types';
import LoadingBooks from './loading-books';

export default function Readlist({ readerId }: { readerId: string; }) {
    const [sorting, setSorting] = useState<keyof typeof Sorting>('latest');
    const [index, setIndex] = useState(0);
    const limit = 5;

    const { data, isLoading } = useSWR(['/api/reader/books', { readerId, sorting, index, limit }], args => source<ApiReaderBooksRequest, ApiReaderBooksResponse>(...args));

    return <section className={styles.wrapper}>
        <div className={styles.header}>
            <div className={styles.heading}>Recently read books</div>

            <Select
                size="sml"
                value={sorting}
                onChange={setSorting}
                options={[
                    { label: 'Latest', value: 'latest' },
                    { label: 'Earliest', value: 'earliest' },
                    { label: 'Highest rated', value: 'highestRated' },
                    { label: 'Lowest rated', value: 'lowestRated' }
                ]} />
        </div>

        <div className={styles.list}>
            {isLoading && <LoadingBooks count={5} />}

            {data?.books?.map(book => <BookResult key={book.id} book={book} />)}

            {!isLoading && !data?.books?.length && <div className={styles.message}>
                This person hasn&apos;t read any books yet.
            </div>}
        </div>

        <Pagination
            page={index}
            setPage={setIndex}
            pages={Math.ceil((data?.results || 0) / limit)}
            style={{ marginLeft: 'auto' }} />
    </section>
}