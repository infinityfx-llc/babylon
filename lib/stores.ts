import { createGlobalStore } from "@infinityfx/control";
import { Genre } from "./types";

export const useFilterStore = createGlobalStore({
    initial: {
        genres: [] as (keyof typeof Genre)[]
    }
});