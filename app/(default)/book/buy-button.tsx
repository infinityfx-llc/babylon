'use client';

import { ActionMenu, Button } from "@infinityfx/fluid";
import { IoLink } from "react-icons/io5";

export default function BuyButton({ editionId }: { editionId: string; }) {

    return <ActionMenu.Root stretch>
        <ActionMenu.Trigger>
            <Button>
                Where to buy
            </Button>
        </ActionMenu.Trigger>

        <ActionMenu.Menu>
            <ActionMenu.Item onClick={() => window.open(`https://www.amazon.com/s?k=${editionId}`, '_blank')}>
                <IoLink /> Amazon
            </ActionMenu.Item>
        </ActionMenu.Menu>
    </ActionMenu.Root>;
}