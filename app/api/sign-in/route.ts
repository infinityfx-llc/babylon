import { ApiEndpoint, defineEndpoint } from '@/lib/api';
import db from '@/prisma/client';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

type SignInData = {
    email: string;
    password: string;
};

export const POST = defineEndpoint(async (data: SignInData)  => {
    const { passwordHash, ...user } = (await db.reader.findUnique({
        where: {
            email: data.email
        }
    })) || {};

    if (!passwordHash || !bcrypt.compareSync(data.password, passwordHash)) return {
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