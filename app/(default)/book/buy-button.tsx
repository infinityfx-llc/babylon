'use client';

import { ActionMenu, Button } from "@infinityfx/fluid";
import { IoLink } from "react-icons/io5";

export default function BuyButton({ editionId }: { editionId: string; }) {

    return <ActionMenu stretch options={[
        {
            type: 'option',
            label: <><IoLink /> Amazon</>,
            onClick: () => window.open(`https://www.amazon.com/s?k=${editionId}`, '_blank')
        }
    ]}>
        <Button>
            Where to buy
        </Button>
    </ActionMenu>;
}