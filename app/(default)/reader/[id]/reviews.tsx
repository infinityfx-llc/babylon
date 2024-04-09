import db from "@/prisma/client";
import Review from "./review";
import styles from './reviews.module.css';

export default async function Reviews() {
    const reviews = await db.review.findMany({
        include: {
            book: true
        }
    })

    return <section>
        <h2 className={styles.heading}>Reviews</h2>

        {reviews.map(review => <Review key={review.id} review={review} />)}
    </section>;
}