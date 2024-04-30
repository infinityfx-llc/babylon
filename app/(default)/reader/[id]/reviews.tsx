import db from "@/prisma/client";
import Review from "./review";
import styles from './reviews.module.css';

export default async function Reviews() {
    const reviews = await db.review.findMany({
        include: {
            book: {
                include: {
                    authors: true
                }
            }
        }
    });

    return <section>
        <h2 className={styles.heading}>Reviews</h2>

        <div className={styles.list}>
            {reviews.map(review => <Review key={review.id} review={review} />)}
        </div>
    </section>;
}