'use client';

import { ApiBookVote } from "@/app/api/book/vote/route";
import { source } from "@/lib/request";
import { ActionMenu, Button } from "@infinityfx/fluid";
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

    return <ActionMenu options={[
        { type: 'option', label: 'Accept', onClick: () => decide('accept') },
        { type: 'divider' },
        { type: 'option', label: 'Reject', onClick: () => decide('reject') }
    ]}>
        <Button size="lrg" round loading={false}>
            <IoEllipsisVertical />
        </Button>
    </ActionMenu>;
}