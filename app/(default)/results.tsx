'use client';

import BookResult from '@/components/book-result';
import { Autocomplete, Button } from '@infinityfx/fluid';
import Link from 'next/link';
import styles from './results.module.css';
import useSWR from 'swr';
import { source } from '@/lib/request';
import { ApiBooks } from '../api/books/route';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useDebounce } from '@infinityfx/control';
import { ApiAutocomplete } from '../api/autocomplete/route';
import { formatCount } from '@/lib/utils';
import LoadingBooks from '@/components/loading-books';

export default function Results() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query);

    const { data: completions } = useSWR(['/api/autocomplete' as const, { query: debouncedQuery }], args => source<ApiAutocomplete>(...args), {
        keepPreviousData: true,
        revalidateOnFocus: false
    });

    const { data, isLoading } = useSWR(['/api/books' as const, debouncedQuery], ([url, query]) => source<ApiBooks>(url, { aggregate: true, query }));

    return <>
        <Autocomplete
            completions={completions?.suggestions.map(suggestion => suggestion.title) || []}
            placeholder="Title, Author, etc.."
            size="lrg"
            contentSize="lrg"
            icon={<IoSearch />}
            value={query}
            onChange={e => setQuery(e.target.value)} />

        <div className={styles.wrapper}>
            <h3 className={styles.heading}>{formatCount(data?.books?.length)} results</h3>

            <div className={styles.list}>
                {isLoading && <LoadingBooks count={5} />}

                {data?.books?.map((book, i) => <BookResult key={i} book={book} />)}
            </div>

            <Link href={query ? `/catalogue/search/${query}` : '/catalogue'} tabIndex={-1} style={{ marginLeft: 'auto' }}>
                <Button variant="neutral" round className={styles.view__all}>
                    View all
                </Button>
            </Link>
        </div>
    </>;
}