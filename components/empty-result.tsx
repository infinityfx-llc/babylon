import styles from './empty-result.module.css';

export default function EmptyResult({ children }: { children: React.ReactNode; }) {

    return <>
        <div className={styles.spacing} />
        <div className={styles.text}>
            {children}
        </div>
    </>;
}