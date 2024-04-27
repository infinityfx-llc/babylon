'use client';

import { ApiBookVote } from "@/app/api/book/vote/route";
import { source } from "@/lib/request";
import { ActionMenu, Button, Divider } from "@infinityfx/fluid";
import { useRouter } from "next/navigation";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ReviewButton({ id }: { id?: number; }) {
    const router = useRouter();

    async function decide(action: 'accept' | 'reject') {
        if (id === undefined) return;

        const { errors } = await source<ApiBookVote>('/api/book/vote', { suggestionId: id, action });

        if (errors) {
            alert(errors.generic);
        } else {
            alert(`Book has been ${action}ed`!);
            router.refresh();
        }
    }

    if (id === undefined) return null;

    return <ActionMenu.Root>
        <ActionMenu.Trigger>
            <Button size="lrg" round loading={false}>
                <IoEllipsisVertical />
            </Button>
        </ActionMenu.Trigger>

        <ActionMenu.Menu>
            <ActionMenu.Item onClick={() => decide('accept')}>Accept</ActionMenu.Item>
            <Divider size="xsm" />
            <ActionMenu.Item onClick={() => decide('reject')}>Reject</ActionMenu.Item>
        </ActionMenu.Menu>
    </ActionMenu.Root>;
}