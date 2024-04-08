'use client';

import { Frame, Accordion, Checkbox, Slider } from '@infinityfx/fluid';
import styles from './filters.module.css';
import { Genre } from '@/lib/types';
import { useFilterStore } from '@/lib/stores';

export default function Filters() {
    const { data, mutate } = useFilterStore();

    return <Frame className={styles.container} background="light" border>
        <Accordion.Root multiple variant="minimal">
            <Accordion.Item label="Genres" defaultOpen>
                <div className={styles.list}>
                    {Object.entries(Genre).map(([value, name]) => {
                        const i = data.genres.indexOf(value as any);

                        return <label key={value} className={styles.filter}>
                            {name}
                            <Checkbox checked={i >= 0} onChange={e => mutate(data => {
                                e.target.checked ? data.genres.push(value as any) : data.genres.splice(i, 1)
                            })} />
                        </label>
                    })}
                </div>
            </Accordion.Item>

            <Accordion.Item label="Rating">
                <Slider min={1} max={10} step={1} handles={2} formatTooltip={value => `${value} star${value > 1 ? 's' : ''}`} />
            </Accordion.Item>
        </Accordion.Root>
    </Frame>;
}