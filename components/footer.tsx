import { Button } from '@infinityfx/fluid';
import Link from 'next/link';
import { IoLogoTwitter, IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import Logo from './logo';
import styles from './footer.module.css';

export default function Footer() {

    return <footer className={styles.footer}>
        <section className={styles.row}>
            <Logo />

            <div className={styles.list}>
                <div className={styles.heading}>Babel's library</div>

                <Link href="/about" className={styles.link}>About this site</Link>
                <Link href="https://infinityfx.dev/contact" className={styles.link}>Contact us</Link>
            </div>

            <div className={styles.socials}>
                <Button variant="minimal" round size="lrg">
                    <IoLogoGithub />
                </Button>
                <Button variant="minimal" round size="lrg">
                    <IoLogoInstagram />
                </Button>
                <Button variant="minimal" round size="lrg">
                    <IoLogoTwitter />
                </Button>
            </div>
        </section>
        <section className={styles.row}>
            <div className={styles.links}>
                <Button variant="minimal" size="sml">
                    Terms
                </Button>
                <Button variant="minimal" size="sml">
                    Privacy policy
                </Button>
            </div>
        </section>
    </footer>
}