import { useFilterStore, useQueryStore } from "@/lib/stores";
import { Filter, Genres } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function useFilters() {
    const { path } = useParams() as { path: [Filter, string] };
    const { mutate } = useFilterStore();
    const { mutate: mutateQuery } = useQueryStore();

    useEffect(() => {
        const [type, value] = path || [];

        switch (type) {
            case 'genre':
                if (value in Genres) mutate(data => { data.genres = [value] as any; })
                break;
            case 'search':
                mutateQuery(data => { data.query = decodeURIComponent(value); });
                break;
                
        }
    }, [path]);
}