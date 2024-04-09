import { useFilterStore } from "@/lib/stores";
import { Filter, Genre } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function useFilters() {
    const { path } = useParams() as { path: [Filter, string] };
    const { mutate } = useFilterStore();

    useEffect(() => {
        const [type, value] = path || [];

        if (!type) return;

        mutate(data => {
            switch (type) {
                case 'genre':
                    if (value in Genre) data.genres = value as any;
                    break;
                case 'search':
                    // TODO
            }
        });
    }, [path]);
}