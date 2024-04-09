import { createGlobalStore } from "@infinityfx/control";
import { Genres, Sorting } from "./types";

export const useFilterStore = createGlobalStore({
    initial: {
        sorting: 'trending' as keyof typeof Sorting,
        genres: [] as (keyof typeof Genres)[],
        ratings: [1, 10]
    },
    persist: true
});

export const useQueryStore = createGlobalStore({
    initial: {
        query: ''
    }
});