'use client';

import { Switch } from '@infinityfx/fluid';
import styles from './font-size-toggle.module.css';

export default function FontSizeToggle() {

    return <div className={styles.wrapper}>
        <span className={styles.small}>A</span>
        <Switch onChange={e => {
            document.documentElement.style.fontSize = e.target.checked ? '20px' : '16px';
        }} />
        <span className={styles.large}>A</span>
    </div>
}