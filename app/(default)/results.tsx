'use client';

import BookResult from '@/components/book-result';
import { Autocomplete, Button, Skeleton } from '@infinityfx/fluid';
import Link from 'next/link';
import styles from './results.module.css';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiBooksRequest, ApiBooksResponse } from '../api/books/route';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useDebounce } from '@infinityfx/control';
import { ApiAutocompleteRequest, ApiAutocompleteResponse } from '../api/autocomplete/route';
import { formatCount } from '@/lib/utils';

export default function Results() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query);

    const { data: completions } = useSWR(['/api/autocomplete', { query: debouncedQuery }], args => source<ApiAutocompleteRequest, ApiAutocompleteResponse>(...args), {
        keepPreviousData: true
    });

    const { data, isLoading } = useSWR(['/api/books', debouncedQuery], ([url, query]) => source<ApiBooksRequest, ApiBooksResponse>(url, { aggregate: true, query }));

    return <>
        <Autocomplete
            completions={completions?.suggestions.map(suggestion => suggestion.title) || []}
            placeholder="Title, Author, etc.."
            size="lrg"
            icon={<IoSearch />}
            value={query}
            onChange={e => setQuery(e.target.value)} />

        <div className={styles.wrapper}>
            <h3 className={styles.heading}>{formatCount(data?.books.length)} results</h3>

            <div className={styles.list}>
                {isLoading && new Array(5).fill(0).map((_, i) => <Skeleton key={i} style={{ aspectRatio: 3 / 5 }} />)}

                {data?.books.map((book, i) => <BookResult key={i} book={book} />)}
            </div>

            <Link href={query ? `/catalogue/search/${query}` : '/catalogue'} tabIndex={-1} style={{ marginLeft: 'auto' }}>
                <Button variant="neutral" round className={styles.view__all}>
                    View all
                </Button>
            </Link>
        </div>
    </>;
}