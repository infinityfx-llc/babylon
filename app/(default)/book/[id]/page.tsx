import { Frame, Badge, Button, Accordion } from '@infinityfx/fluid';
import { IoBookmarkOutline, IoShareSocial, IoStar } from 'react-icons/io5';
import Image from 'next/image';
import WriteReview from './write-review';
import Review from './review';
import styles from './page.module.css';

import { getById } from '@/lib/db';

export default function Page({ params }: { params: { id: string; }; }) {

    const book = getById(params.id);

    return <main className={styles.main}>
        <section className={styles.section}>
            <div className={styles.side}>

                <Frame className={styles.cover}>
                    <Image src={`/images/${book.id}.jpg`} fill />
                </Frame>

                <div className={styles.rating}>
                    <IoStar /> {book.rating.value.toFixed(1)} &bull; {book.rating.count} ratings
                </div>

                <Button>
                    Where to buy
                </Button>
            </div>
            
            <div className={styles.content}>

                <section className={styles.header}>
                    <div className={styles.vertical}>
                        <Badge color="var(--f-clr-fg-200)">{book.genre.name}</Badge>
                        <h1 className={styles.title}>{book.title}</h1>
                        <h2 className={styles.author}>By {book.author.name}</h2>
                    </div>

                    <div className={styles.horizontal}>
                        <Button round size="lrg" variant="minimal">
                            <IoBookmarkOutline />
                        </Button>
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
                        Released: {book.releaseDate.toLocaleDateString()} <br />
                        Pages: {book.pages}
                    </Accordion.Item>
                </Accordion.Root>

                <section className={styles.reviews}>
                    <h3>Reviews</h3>

                    <WriteReview />

                    <div className={styles.list}>
                        {new Array(6).fill(0).map((_, i) => <Review key={i} />)}
                    </div>
                </section>
            </div>
        </section>
    </main>
}