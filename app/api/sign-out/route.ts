import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import { cookies } from 'next/headers';

export const POST = defineEndpoint(async () => {
    cookies().delete('session');

    return { user: null };
});

export type ApiSignOut = ApiEndpoint<'/api/sign-out', {}, typeof POST>;