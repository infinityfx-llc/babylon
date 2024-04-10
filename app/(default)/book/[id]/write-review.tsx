import { Textarea, Button, Segmented } from '@infinityfx/fluid';
import styles from './write-review.module.css';

export default function WriteReview() {

    return <div className={styles.wrapper}>
        <h3>Give a rating</h3>

        <Segmented defaultValue={8} options={new Array(10).fill(0).map((_, i) => ({ label: i + 1, value: i + 1 }))} />

        <Textarea resize="vertical" label="Review (optional)" />

        <Button>
            Rate this book
        </Button>
    </div>
}