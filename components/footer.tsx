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
                <div className={styles.heading}>Babel&apos;s library</div>

                <Link href="/about" className={styles.link}>About this site</Link>
                <Link href="/book/suggest" className={styles.link}>Get your book featured</Link>
                <Link href="https://infinityfx.dev/contact" className={styles.link}>Contact us</Link>
            </div>

            <div className={styles.socials}>
                <Link href="https://github.com/infinityfx-llc/babylon" target="_blank" tabIndex={-1}>
                    <Button variant="minimal" size="lrg">
                        <IoLogoGithub />
                    </Button>
                </Link>
                <Link href="https://www.instagram.com/infinityfx/" target="_blank" tabIndex={-1}>
                    <Button variant="minimal" size="lrg">
                        <IoLogoInstagram />
                    </Button>
                </Link>
                <Link href="https://twitter.com/infinityfx" target="_blank" tabIndex={-1}>
                    <Button variant="minimal" size="lrg">
                        <IoLogoTwitter />
                    </Button>
                </Link>
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

            <div className={styles.copyright}>
                ©Copyright2016-{new Date().getFullYear()} InfinityFX. All rights reserved.
            </div>
        </section>
    </footer>
}