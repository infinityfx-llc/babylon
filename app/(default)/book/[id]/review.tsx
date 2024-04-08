import { IoStar } from 'react-icons/io5';
import styles from './review.module.css';

export default function Review() {

    return <div className={styles.review}>
        <div className={styles.profile} />
        
        <div className={styles.body}>
            <div className={styles.row}>
                <div className={styles.name}>
                    John Doe
                </div>

                <div className={styles.date}>
                    April 4th, 2024
                </div>
            </div>

            <div className={styles.rating}>
                <IoStar /> 10.0
            </div>

            <p className={styles.text}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat dicta, molestias non at, adipisci saepe autem maxime, sint impedit omnis excepturi minus tempore natus? Eum nihil deleniti ratione ab similique?
            </p>
        </div>
    </div>
}