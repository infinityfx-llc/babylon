'use client';

import { ApiReadlist } from "@/app/api/readlist/route";
import { source } from "@/lib/request";
import { Button, Tooltip } from "@infinityfx/fluid";
import { useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export default function ReadlistButton({ bookId, defaultRead }: { bookId: string; defaultRead: boolean; }) {
    const [bookmarked, setBookmarked] = useState(defaultRead);

    async function toggleRead() {
        setBookmarked(!bookmarked);

        const { read, errors } = await source<ApiReadlist>('/api/readlist', { bookId });

        if (errors) {
            setBookmarked(false);
            
            if (errors.generic) alert(errors.generic);
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