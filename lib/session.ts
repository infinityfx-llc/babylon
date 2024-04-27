import { Reader } from "@prisma/client";
import { cookies } from "next/headers";

export function getSession() {
    const session = cookies().get('session')?.value;

    return {
        user: session ? JSON.parse(session) as Omit<Reader, 'passwordHash'> : null
    };
}