'use client';

import { ApiReadlist } from "@/app/api/readlist/route";
import { useToast } from "@/context/toast";
import { source } from "@/lib/request";
import { Button, Tooltip } from "@infinityfx/fluid";
import { useState } from "react";
import { IoAlert, IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export default function ReadlistButton({ bookId, defaultRead }: { bookId: string; defaultRead: boolean; }) {
    const [bookmarked, setBookmarked] = useState(defaultRead);
    const notify = useToast();

    async function toggleRead() {
        setBookmarked(!bookmarked);

        const { read, errors } = await source<ApiReadlist>('/api/readlist', { bookId });

        if (errors) {
            setBookmarked(false);
            
            if (errors.generic) notify({
                title: errors.generic,
                color: 'red',
                icon: <IoAlert />
            });
        } else {
            setBookmarked(read);
        }
    }

    return <Tooltip content={bookmarked ? 'Unmark as read' : 'Mark as read'}>
        <Button variant="minimal" round size="lrg" onClick={toggleRead}>
            {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
        </Button>
    </Tooltip>;
}