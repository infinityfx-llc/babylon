import { Frame, Badge, Button, Accordion } from '@infinityfx/fluid';
import { IoBookmarkOutline, IoShareSocial, IoStar } from 'react-icons/io5';
import Image from 'next/image';
import WriteReview from './write-review';
import Review from './review';
import styles from './page.module.css';

export default function Page({ params }: { params: { id: string; }; }) {

    return <main className={styles.main}>
        <section className={styles.section}>
            <div className={styles.side}>

                <Frame className={styles.cover}>
                    <Image src="/images/the-lord-of-the-rings.jpg" fill />
                </Frame>

                <div className={styles.rating}>
                    <IoStar /> 10.0
                    &bull;
                    69 ratings
                </div>

                <Button>
                    Where to buy
                </Button>
            </div>
            
            <div className={styles.content}>

                <section className={styles.header}>
                    <div className={styles.vertical}>
                        <Badge color="var(--f-clr-fg-200)">Fantasy</Badge>
                        <h1 className={styles.title}>The Lord of the Rings</h1>
                        <h2 className={styles.author}>By J.R.R. Tolkien</h2>
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
                            One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them

                            In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.

                            From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion.

                            When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom.

                            The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider.
                        </p>
                    </Accordion.Item>
                    <Accordion.Item label="Details">

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