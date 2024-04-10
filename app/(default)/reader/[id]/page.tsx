import { formatCount } from '@/lib/utils';
import db from '@/prisma/client';
import { Button, Tooltip } from '@infinityfx/fluid';
import { notFound } from 'next/navigation';
import { IoEllipsisVertical, IoPersonAdd } from 'react-icons/io5';
import styles from './page.module.css';
import ReadList from './read-list';
import Reviews from './reviews';

export default async function Page({ params }: { params: { id: string; } }) {
    const reader = await db.reader.findUnique({
        where: {
            id: params.id
        },
        include: {
            _count: true
        }
    });

    if (!reader) return notFound();

    return <main className={styles.main}>
        <section className={styles.section}>
            <div className={styles.row}>
                <div className={styles.profile} />

                <div className={styles.column}>
                    <h1>{reader.firstName} {reader.lastName}</h1>

                    <div>{formatCount(reader._count.friends)} friend{reader._count.friends == 1 ? '' : 's'} &bull; {formatCount(reader._count.reviews)} review{reader._count.reviews == 1 ? '' : 's'}</div>
                </div>

                <div className={styles.buttons}>
                    <Tooltip content="Add as friend">
                        <Button variant="minimal" size="lrg" round>
                            <IoPersonAdd />
                        </Button>
                    </Tooltip>

                    <Button variant="minimal" size="lrg" round>
                        <IoEllipsisVertical />
                    </Button>
                </div>
            </div>

            <ReadList readerId={reader.id} />

            <Reviews />
        </section>
    </main>;
}