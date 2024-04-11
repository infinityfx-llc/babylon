import { BookTypes } from '@/lib/types';
import { Badge, Divider, Frame, Pagination } from '@infinityfx/fluid';
import { BookEdition } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './editions.module.css';

export default function Editions({ title, editions }: { title: string; editions: BookEdition[]; }) {

    if (!editions.length) return null;

    return <section className={styles.container}>
        <Divider size="xsm" label="Other editions" labelPosition="start" />

        <div className={styles.list}>
            {editions.map(edition => (
                <Link href={`/book/${edition.id}`} key={edition.id}>
                    <Frame radius="med" background="light" className={styles.edition}>
                        <Frame className={styles.cover} background="dark">
                            <Image src={`/images/${edition.id}.jpg`} fill alt={title} />
                        </Frame>
                        
                        <Badge color="var(--f-clr-fg-200)" className={styles.badge}>
                            {BookTypes[edition.type]}
                        </Badge>

                        <div className={styles.info}>
                            Published: {edition.published.toLocaleDateString('en', { dateStyle: 'medium' })} <br />
                            Language: {edition.language}
                        </div>
                    </Frame>
                </Link>
            ))}
        </div>

        <Pagination pages={1} variant="neutral" className={styles.pagination} />
    </section>;
}