import { Frame, Badge, Button, Accordion, ActionMenu, Tooltip } from '@infinityfx/fluid';
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

export default async function Page({ params }: { params: { id: string; }; }) {

    const book = await db.book.findUnique({
        where: {
            id: params.id
        },
        include: {
            author: true,
            genre: true
        }
    });

    if (!book) return notFound();

    return <main className={styles.main}>
        <section className={styles.section}>
            <div className={styles.side}>

                <Frame className={styles.cover}>
                    <Image src={`/images/${book.id}.jpg`} fill alt={book.title} />
                </Frame>

                <div className={styles.rating}>
                    <IoStar /> {book.rating / 10} &bull; {formatCount(book.ratings)} ratings
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
                        <Link href={`/catalogue/search/${book.author.name}`}>
                            <Button variant="minimal" size="lrg">
                                By {book.author.name}
                            </Button>
                        </Link>
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

                <Accordion.Root>
                    <Accordion.Item label="Description" defaultOpen>
                        <p className={styles.description}>
                            {book.description}
                        </p>
                    </Accordion.Item>
                    <Accordion.Item label="Details">
                        Released: {book.releaseDate.toLocaleDateString('en', { dateStyle: 'long' })} <br />
                        Pages: {book.pages}
                    </Accordion.Item>
                </Accordion.Root>

                <Related bookId={book.id} />

                <WriteReview bookId={book.id} />

                <Reviews bookId={book.id} />
            </div>
        </section>
    </main>
}