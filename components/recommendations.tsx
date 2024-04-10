'use client';

import { Genres } from '@/lib/types';
import { Pagination, Select } from '@infinityfx/fluid';
import styles from './recommendations.module.css';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiBooksRequest, ApiBooksResponse } from '@/app/api/books/route';
import BookResult from './book-result';
import { useState } from 'react';

export default function Recommendations() {
    const [genre, setGenre] = useState('all');

    const { data } = useSWR(['/api/books', { aggregate: true }], args => source<ApiBooksRequest, ApiBooksResponse>(...args));

    return <section className={styles.container}>
        <div className={styles.header}>
            <div className={styles.heading}>Your recommendations</div>

            <Select size="sml"
                options={[{ label: 'All', value: 'all' }, ...Object.entries(Genres).map(([value, label]) => ({ label, value }))]}
                value={genre}
                onChange={setGenre} />
        </div>

        <div className={styles.list}>
            {data?.books.map(book => <BookResult key={book.id} book={book} />)}
        </div>

        <Pagination pages={1} style={{ marginLeft: 'auto' }} />
    </section>;
}