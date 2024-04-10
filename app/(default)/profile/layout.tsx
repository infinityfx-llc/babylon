import { getSession } from "@/lib/session";
import { formatCount } from "@/lib/utils";
import db from "@/prisma/client";
import { redirect } from "next/navigation";
import styles from './layout.module.css';
import Navigation from "./navigation";

export default async function Layout({ children }: { children: React.ReactNode; }) {
    const { user } = getSession();

    if (!user) redirect('/sign-in');

    const reader = await db.reader.findUnique({
        where: {
            id: user.id
        },
        include: {
            _count: true
        }
    });

    if (!reader) throw new Error();

    return <main className={styles.main}>
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.profile} />

                <div>
                    <h1 className={styles.name}>{reader.firstName} {reader.lastName}</h1>
                    <div>{formatCount(reader._count.friends)} friend{reader._count.friends == 1 ? '' : 's'} &bull; {formatCount(reader._count.reviews)} review{reader._count.reviews == 1 ? '' : 's'}</div>
                </div>
            </div>

            <Navigation />

            {children}
        </section>
    </main>;
}