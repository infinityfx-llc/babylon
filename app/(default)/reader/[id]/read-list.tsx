'use client';

import BookResult from '@/components/book-result';
import { Pagination, Skeleton } from '@infinityfx/fluid';
import styles from './read-list.module.css';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiReaderBooksRequest, ApiReaderBooksResponse } from '@/app/api/reader/books/route';
import { useState } from 'react';

export default function ReadList({ readerId }: { readerId: string; }) {
    const [index, setIndex] = useState(0);
    const limit = 5;

    const { data, isLoading } = useSWR(['/api/reader/books', { readerId, index, limit }], args => source<ApiReaderBooksRequest, ApiReaderBooksResponse>(...args));

    return <section className={styles.wrapper}>
        <h2 className={styles.heading}>Recently read books</h2>

        <div className={styles.list}>
            {isLoading && new Array(5).fill(0).map((_, i) => <Skeleton key={i} style={{ aspectRatio: 3 / 5 }} />)}

            {data?.books?.map(book => <BookResult key={book.id} book={book} />)}

            {!isLoading && !data?.books?.length && <div className={styles.message}>
                This person hasn't read any books yet.
            </div>}
        </div>

        <Pagination
            page={index}
            setPage={setIndex}
            pages={Math.ceil((data?.results || 0) / limit)}
            style={{ marginLeft: 'auto' }} />
    </section>
}