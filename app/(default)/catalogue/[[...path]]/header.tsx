'use client';

import { useFilterStore } from "@/lib/stores";
import { Sorting } from "@/lib/types";
import { Autocomplete, Select } from "@infinityfx/fluid";
import { IoSearch } from "react-icons/io5";

export default function Header() {
    const { data, mutate } = useFilterStore();

    return <div style={{ display: 'flex', gap: 'var(--f-spacing-med)' }}>
        <Autocomplete completions={[]} placeholder="Title, Author, etc.." icon={<IoSearch />} style={{ flexGrow: 1 }} />

        <Select placeholder="Sorting"
            options={Object.entries(Sorting).map(([value, label]) => ({ label, value }))}
            value={data.sorting}
            onChange={val => mutate(data => {
                data.sorting = val;
            })} />
    </div>
}