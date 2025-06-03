import { Reader } from "@prisma/client";
import { cookies } from "next/headers";

export async function getSession() {
    const session = (await cookies()).get('session')?.value;

    return {
        user: session ? JSON.parse(session) as Omit<Reader, 'passwordHash'> : null
    };
}