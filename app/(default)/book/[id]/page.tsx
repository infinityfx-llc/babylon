import styles from './page.module.css';
import db from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { cache } from 'react';
import BookOverview from '../book-overview';
import { getSession } from '@/lib/session';

const getBookEdition = cache(async (id: string) => {
    const { user } = getSession();

    return await db.bookEdition.findUnique({
        where: {
            id
        },
        include: {
            editionOf: {
                include: {
                    authors: true,
                    genres: true,
                    _count: true,
                    editions: true,
                    readers: user ? {
                        where: {
                            id: user.id
                        },
                        select: {
                            id: true
                        }
                    } : undefined
                }
            }
        }
    });
});

export async function generateMetadata({ params }: { params: { id: string; }; }): Promise<Metadata> {
    const edition = await getBookEdition(params.id);

    return {
        title: edition?.editionOf.title
    };
}

export default async function Page({ params }: { params: { id: string; }; }) {

    const edition = await getBookEdition(params.id);

    if (!edition) return notFound();

    return <main className={styles.main}>
        <BookOverview edition={edition} />
    </main>;
}