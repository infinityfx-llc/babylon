import { Frame, Accordion, Checkbox } from '@infinityfx/fluid';
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
        </Accordion.Root>
    </Frame>;
}