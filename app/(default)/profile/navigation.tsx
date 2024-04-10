'use client';

import { Tabs } from "@infinityfx/fluid";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter();
    const pathname = usePathname();

    return <Tabs
        defaultValue={pathname.slice(8) || '/'}
        onChange={path => router.push(`/profile${path}`)}
        options={[
            { label: 'Profile', value: '/' },
            { label: 'Readlist', value: '/readlist' },
            { label: 'Settings', value: '/settings', disabled: true }
        ]} />
}