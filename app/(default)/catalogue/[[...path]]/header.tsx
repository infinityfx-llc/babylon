'use client';

import { ApiAutocompleteRequest, ApiAutocompleteResponse } from "@/app/api/autocomplete/route";
import { source } from "@/lib/request";
import { useFilterStore, useQueryStore } from "@/lib/stores";
import { Sorting } from "@/lib/types";
import { useDebounce } from "@infinityfx/control";
import { Autocomplete, Select } from "@infinityfx/fluid";
import { IoSearch } from "react-icons/io5";
import useSWR from 'swr';

export default function Header() {
    const { data, mutate } = useFilterStore();
    const { data: queryData, mutate: mutateQuery } = useQueryStore();

    const debouncedQuery = useDebounce(queryData.query);
    const { data: completions } = useSWR(['/api/autocomplete', { query: debouncedQuery }], args => source<ApiAutocompleteRequest, ApiAutocompleteResponse>(...args), {
        keepPreviousData: true,
        revalidateOnFocus: false
    });

    return <div style={{ display: 'flex', gap: 'var(--f-spacing-med)' }}>
        <Autocomplete
            completions={completions?.suggestions.map(suggestion => suggestion.title) || []}
            placeholder="Title, Author, etc.."
            icon={<IoSearch />}
            style={{ flexGrow: 1 }}
            value={queryData.query}
            onChange={e => mutateQuery(data => {
                data.query = e.target.value;
            })} />

        <Select placeholder="Sorting"
            options={Object.entries(Sorting).map(([value, label]) => ({ label, value }))}
            value={data.sorting}
            onChange={val => mutate(data => {
                data.sorting = val;
            })} />
    </div>
}