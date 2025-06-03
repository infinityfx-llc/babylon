import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { cookies } from 'next/headers';

export const POST = defineEndpoint(async () => {
    (await cookies()).delete('session');

    return { user: null };
});

export type ApiSignOut = ApiEndpoint<'/api/sign-out', {}, typeof POST>;