'use client';

import { ApiAutocomplete } from "@/app/api/autocomplete/route";
import { source } from "@/lib/request";
import { useFilterStore, useQueryStore } from "@/lib/stores";
import { Sorting } from "@/lib/types";
import { useDebounce } from "@infinityfx/control";
import { Autocomplete, Button, Drawer, Select } from "@infinityfx/fluid";
import { useState } from "react";
import { IoFilter, IoSearch } from "react-icons/io5";
import useSWR from 'swr';
import Filters from "./filters";
import styles from './header.module.css';

export default function Header() {
    const [show, setShow] = useState(false);

    const { data, mutate } = useFilterStore();
    const { data: queryData, mutate: mutateQuery } = useQueryStore();

    const debouncedQuery = useDebounce(queryData.query);
    const { data: completions } = useSWR(['/api/autocomplete' as const, { query: debouncedQuery }], args => source<ApiAutocomplete>(...args), {
        keepPreviousData: true,
        revalidateOnFocus: false
    });

    return <div className={styles.header}>
        <Drawer show={show} onClose={() => setShow(false)}>
            <Filters />
        </Drawer>

        <Autocomplete
            completions={completions?.suggestions.map(suggestion => suggestion.title) || []}
            placeholder="Title, Author, etc.."
            icon={<IoSearch />}
            style={{ flexGrow: 1 }}
            value={queryData.query}
            onChange={e => mutateQuery(data => {
                data.query = e.target.value;
            })} />

        <div className={styles.row}>
            <Select placeholder="Sorting"
                style={{ flexGrow: 1 }}
                options={Object.entries(Sorting).map(([value, label]) => ({ label, value }))}
                value={data.sorting}
                onChange={val => mutate(data => {
                    data.sorting = val;
                })} />

            <Button onClick={() => setShow(!show)} size="lrg" variant="light" className={styles.toggle}>
                <IoFilter />
            </Button>
        </div>
    </div>
}