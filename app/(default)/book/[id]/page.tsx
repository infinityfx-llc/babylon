import { Frame, Badge, Button, ActionMenu, Tooltip, Divider } from '@infinityfx/fluid';
import { IoBookmarkOutline, IoShareSocial, IoStar } from 'react-icons/io5';
import Image from 'next/image';
import WriteReview from './write-review';
import styles from './page.module.css';
import db from '@/prisma/client';
import { notFound } from 'next/navigation';
import Reviews from './reviews';
import { formatCount } from '@/lib/utils';
import Related from './related';
import Link from 'next/link';
import Editions from './editions';
import { BookTypes } from '@/lib/types';

export default async function Page({ params }: { params: { id: string; }; }) {

    const edition = await db.bookEdition.findUnique({
        where: {
            id: params.id
        },
        include: {
            editionOf: {
                include: {
                    author: true,
                    genre: true,
                    _count: true,
                    editions: true
                }
            }
        }
    });

    if (!edition) return notFound();

    const book = edition.editionOf;
    const editions = book.editions.filter(book => book.id !== edition.id);

    return <main className={styles.main}>
        <section className={styles.section}>
            <div className={styles.side}>

                <Frame className={styles.cover} background="light">
                    <Image src={`/images/${edition.id}.jpg`} fill alt={book.title} />
                </Frame>

                <div className={styles.rating}>
                    <IoStar /> {book.rating.toFixed(1)} &bull; {formatCount(book._count.reviews)} ratings
                </div>

                <ActionMenu stretch options={[
                    { type: 'option', label: 'Amazon' }
                ]}>
                    <Button>
                        Where to buy
                    </Button>
                </ActionMenu>
            </div>

            <div className={styles.content}>

                <section className={styles.header}>
                    <div className={styles.vertical}>
                        <Badge color="var(--f-clr-fg-200)">{book.genre.name}</Badge>
                        <h1 className={styles.title}>{book.title}</h1>

                        <h2>
                            <Link href={`/catalogue/search/${book.author.name}`}>
                                <Button variant="minimal" size="lrg">
                                    {book.author.name}
                                </Button>
                            </Link>
                        </h2>
                    </div>

                    <div className={styles.horizontal}>
                        <Tooltip content="Mark as read">
                            <Button round size="lrg" variant="minimal">
                                <IoBookmarkOutline />
                            </Button>
                        </Tooltip>
                        <Button round size="lrg" variant="minimal">
                            <IoShareSocial />
                        </Button>
                    </div>
                </section>

                <div>
                    <h3 className={styles.heading}>Description</h3>

                    <p className={styles.description}>
                        {book.description}
                    </p>
                </div>

                <div className={styles.tags}>
                    <Badge size="med">
                        {BookTypes[edition.type]}
                    </Badge>
                    <Badge size="med" color="var(--f-clr-fg-200)">
                        Published: {edition.published.toLocaleDateString('en', { dateStyle: 'medium' })}
                    </Badge>
                    <Badge size="med" color="var(--f-clr-fg-200)">
                        Language: {edition.language}
                    </Badge>
                    <Badge size="med" color="var(--f-clr-fg-200)">
                        Pages: {edition.pages}
                    </Badge>
                </div>

                <Editions title={book.title} editions={editions} />

                <Related bookId={book.id} />

                <Divider size="xsm" label="Give a review" labelPosition="start" />

                <WriteReview bookId={book.id} />

                <Reviews bookId={book.id} />
            </div>
        </section>
    </main>
}