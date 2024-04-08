'use client';

import { Frame, Accordion, Checkbox, Slider } from '@infinityfx/fluid';
import styles from './filters.module.css';

export default function Filters() {

    return <Frame className={styles.container} background="light" border>
        <Accordion.Root multiple variant="minimal">
            <Accordion.Item label="Genres" defaultOpen>
                <div className={styles.list}>
                    <label className={styles.filter}>
                        Fantasy
                        <Checkbox />
                    </label>

                    <label className={styles.filter}>
                        Thriller
                        <Checkbox />
                    </label>
                </div>
            </Accordion.Item>

            <Accordion.Item label="Rating">
                <Slider min={1} max={10} step={1} handles={2} formatTooltip={value => `${value} star${value > 1 ? 's' : ''}`} />
            </Accordion.Item>
        </Accordion.Root>
    </Frame>;
}