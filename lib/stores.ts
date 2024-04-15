import { createGlobalStore } from "@infinityfx/control";
import { Genres, Languages, Sorting } from "./types";

export const useFilterStore = createGlobalStore({
    initial: {
        sorting: 'trending' as keyof typeof Sorting,
        genres: [] as (keyof typeof Genres)[],
        ratings: [1, 10],
        timestamps: [null, null] as (Date | null)[],
        languages: [] as (keyof typeof Languages)[]
    },
    persist: true
});

export const useQueryStore = createGlobalStore({
    initial: {
        query: ''
    }
});