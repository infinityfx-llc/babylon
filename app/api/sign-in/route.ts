import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import db from '@/prisma/client';
import { cookies } from 'next/headers';

type SignInData = {
    email: string;
    password: string;
};

export const POST = defineEndpoint(async (data: SignInData)  => {
    const user = await db.reader.findUnique({
        where: {
            email: data.email
        }
    });

    if (!user || user.passwordHash !== data.password) return {
        user: undefined,
        errors: {
            email: 'Email or password is incorrect.',
            password: 'Email or password is incorrect.'
        }
    };

    cookies().set('session', JSON.stringify(user));

    return { user };
});

export type ApiSignIn = ApiEndpoint<'/api/sign-in', SignInData, typeof POST>;