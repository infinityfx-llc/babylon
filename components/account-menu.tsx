'use client';

import { ApiSignOut } from "@/app/api/sign-out/route";
import { source } from "@/lib/request";
import { ActionMenu, Divider } from "@infinityfx/fluid";
import { useRouter } from "next/navigation";

export default function AccountMenu({ children, name }: { children: React.ReactElement; name: string; }) {
    const router = useRouter();

    return <ActionMenu.Root>
        <ActionMenu.Trigger>
            {children}
        </ActionMenu.Trigger>

        <ActionMenu.Menu>
            <ActionMenu.Item onClick={() => router.push('/profile')}>{name}</ActionMenu.Item>
            <Divider size="xsm" />
            <ActionMenu.Item onClick={async () => {
                await source<ApiSignOut>('/api/sign-out', {});
                router.refresh();
            }}>
                Sign out
            </ActionMenu.Item>
        </ActionMenu.Menu>
    </ActionMenu.Root>;
}