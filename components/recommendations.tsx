'use client';

import styles from './recommendations.module.css';
import { Genres } from '@/lib/types';
import { Pagination, Select } from '@infinityfx/fluid';
import useSWR from 'swr';
import { source } from '@/lib/request';
import BookResult from './book-result';
import { useState } from 'react';
import { ApiRecommendations } from '@/app/api/recommendations/route';
import LoadingBooks from './loading-books';
import EmptyResult from './empty-result';

export default function Recommendations() {
    const [genre, setGenre] = useState<'all' | keyof typeof Genres>('all');

    const { data, isLoading } = useSWR(['/api/recommendations' as const, { genre }], args => source<ApiRecommendations>(...args));

    return <section className={styles.container}>
        <div className={styles.header}>
            <div className={styles.heading}>Your recommendations</div>

            <Select size="sml"
                options={[{ label: 'All', value: 'all' }, ...Object.entries(Genres).map(([value, label]) => ({ label, value }))]}
                value={genre}
                onChange={setGenre} />
        </div>

        <div className={styles.list}>
            {isLoading && <LoadingBooks count={5} />}

            {!isLoading && !data?.books.length && <EmptyResult>
                You have no matching recommendations
            </EmptyResult>}

            {data?.books.map(book => <BookResult key={book.id} book={book} />)}
        </div>

        <Pagination pages={1} style={{ marginLeft: 'auto' }} />
    </section>;
}