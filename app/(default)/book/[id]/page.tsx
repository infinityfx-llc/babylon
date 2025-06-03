import styles from './page.module.css';
import db from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { cache } from 'react';
import BookOverview from '../book-overview';
import { getSession } from '@/lib/session';

const getBookEdition = cache(async (id: string) => {
    const { user } = await getSession();

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

export async function generateMetadata({ params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Metadata> {
    const { id } = await params;
    const edition = await getBookEdition(id);

    return {
        title: edition?.editionOf.title
    };
}

export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const edition = await getBookEdition(id);

    if (!edition) return notFound();

    return <main className={styles.main}>
        <BookOverview edition={edition} />
    </main>;
}