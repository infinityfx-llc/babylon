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
                <div className={styles.heading}>Babylon</div>

                <Link href="/about" className={styles.link}>About us</Link>
                <Link href="/contact" className={styles.link}>Contact us</Link>
                <Link href="/careers" className={styles.link}>Careers</Link>
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