import { createGlobalStore } from "@infinityfx/control";
import { Genre, Sorting } from "./types";

export const useFilterStore = createGlobalStore({
    initial: {
        sorting: 'trending' as keyof typeof Sorting,
        genres: [] as (keyof typeof Genre)[],
        ratings: [1, 10]
    }
});