'use client';

import { Button } from "@infinityfx/fluid";
import { IoShareSocial } from "react-icons/io5";

export default function ShareButton({ title }: { title: string; }) {

    return <Button round
        size="lrg"
        variant="minimal"
        onClick={async () => {
            navigator.share({
                title,
                url: window.location.href
            });
        }}>
        <IoShareSocial />
    </Button>;
}