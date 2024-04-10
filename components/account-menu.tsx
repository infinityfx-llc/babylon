'use client';

import { source } from "@/lib/request";
import { ActionMenu } from "@infinityfx/fluid";
import { useRouter } from "next/navigation";

export default function AccountMenu({ children, name }: { children: React.ReactElement; name: string; }) {
    const router = useRouter();

    return <ActionMenu options={[
        { type: 'option', label: name, onClick: () => router.push('/profile') },
        { type: 'divider' },
        {
            type: 'option', label: 'Sign out', onClick: async () => {
                await source('/api/sign-out', {});
                router.refresh();
            }
        }
    ]}>
        {children}
    </ActionMenu>;
}