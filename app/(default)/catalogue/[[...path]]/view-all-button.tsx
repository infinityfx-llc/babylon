'use client';

import { useFilterStore } from "@/lib/stores";
import { Genre } from "@/lib/types";
import { Button } from "@infinityfx/fluid";

export default function ViewAllButton({ genre }: { genre: keyof typeof Genre; }) {
    const { mutate } = useFilterStore();

    return <Button variant="neutral" size="sml" round
        style={{
            marginLeft: 'auto',
            paddingInline: '2em'
        }}
        onClick={() => mutate(data => {
            data.genres = [genre]
        })}>
        View all
    </Button>;
}