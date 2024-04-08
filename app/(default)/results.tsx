import BookResult from '@/components/book-result';
import { Button } from '@infinityfx/fluid';
import styles from './results.module.css';

export default function Results() {

    return <div className={styles.wrapper}>
        <h2 className={styles.heading}>Results [12]</h2>

        <div className={styles.list}>
            {new Array(12).fill(0).map((_, i) => <BookResult key={i} />)}
        </div>

        <Button variant="neutral" round className={styles.view__all}>
            View all
        </Button>
    </div>
}