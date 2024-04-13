import styles from './book-overview.module.css';
import { BookTypes, Languages } from "@/lib/types";
import { formatCount } from "@/lib/utils";
import { Badge, Button, Divider, Frame } from "@infinityfx/fluid";
import { Author, Book, BookEdition, Genre, Reader } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { IoShareSocial, IoStar } from "react-icons/io5";
import BuyButton from "./buy-button";
import Editions from "./editions";
import Related from "./related";
import Reviews from "./reviews";
import ReviewButton from './review-button';
import ReadlistButton from '@/components/readlist-button';

export default function BookOverview({ edition, review }: {
    edition: BookEdition & {
        editionOf: Book & {
            genre: Genre;
            author: Author;
            readers?: { id: string }[];
            editions: BookEdition[];
            _count: {
                reviews: number;
            }
        };
    },
    review?: number;
}) {

    const book = edition.editionOf;
    const editions = book.editions.filter(book => book.id !== edition.id);

    return <section className={styles.overview}>
        <div className={styles.side}>

            <Frame className={styles.cover} background="light">
                <Image src={edition.cover} fill alt={book.title} />
            </Frame>

            <div className={styles.rating}>
                <IoStar /> {book.rating.toFixed(1)} &bull; {formatCount(book._count.reviews)} rating{book._count.reviews == 1 ? '' : 's'}
            </div>

            <BuyButton editionId={edition.id} />
        </div>

        <div className={styles.content}>

            <section className={styles.header}>
                <div className={styles.vertical}>
                    <Badge color="var(--f-clr-fg-200)">{book.genre.name}</Badge>
                    <h1 className={styles.title}>{book.title}</h1>

                    <h2>
                        <Link href={`/catalogue/search/${book.author.fullName}`}>
                            <Button variant="minimal" size="lrg">
                                {book.author.name}
                            </Button>
                        </Link>
                    </h2>
                </div>

                <div className={styles.horizontal}>
                    <ReadlistButton defaultRead={!!book.readers?.length} bookId={book.id} />

                    <Button round size="lrg" variant="minimal">
                        <IoShareSocial />
                    </Button>

                    <ReviewButton id={review} />
                </div>
            </section>

            <div>
                <h3 className={styles.heading}>Description</h3>

                <p className={styles.description}>
                    {book.description}
                </p>
            </div>

            <div className={styles.info}>
                <Badge size="med">
                    {BookTypes[edition.type]}
                </Badge>

                Published: {edition.published.toLocaleDateString('en', { dateStyle: 'medium' })} <br />
                Language: {Languages[edition.language as keyof typeof Languages]} <br />
                Pages: {edition.pages} <br />
                ISBN: {edition.id}
            </div>

            <Editions title={book.title} editions={editions} />

            <Related bookId={book.id} />

            <Divider size="xsm" label="Give a review" labelPosition="start" />

            <Reviews bookId={book.id} />
        </div>
    </section>;
}