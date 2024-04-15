import styles from './not-found.module.css';
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function NotFound() {

    return <>
        <Header />

        <main className={styles.main}>
            <h1 className={styles.title}>404</h1>
        </main>

        <Footer />
    </>
}