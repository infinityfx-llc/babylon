'use client';

import { Accordion, Checkbox, Slider, DateField, Select } from '@infinityfx/fluid';
import styles from './filters.module.css';
import { Genres, Languages } from '@/lib/types';
import { useFilterStore } from '@/lib/stores';

export default function Filters() {
    const { data, mutate } = useFilterStore();

    return <Accordion.Root multiple variant="minimal">
        <Accordion.Item label="Genres" defaultOpen>
            <div className={styles.list}>
                {Object.entries(Genres).map(([value, name]) => {
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

        <Accordion.Item label="Ratings">
            <Slider min={1} max={10} step={1} handles={2}
                formatTooltip={value => `${value} star${value > 1 ? 's' : ''}`}
                value={data.ratings}
                onChange={vals => mutate(data => {
                    data.ratings = vals;
                })} />
        </Accordion.Item>

        <Accordion.Item label="Release date">
            <div className={styles.row}>
                <DateField label="From"
                    clearable
                    value={data.timestamps[0]}
                    onChange={date => mutate(data => data.timestamps[0] = date)} />
                <DateField label="To"
                    clearable
                    value={data.timestamps[1]}
                    onChange={date => mutate(data => data.timestamps[1] = date)} />
            </div>
        </Accordion.Item>

        <Accordion.Item label="Languages">
            <Select
                searchable
                multiple
                value={data.languages}
                onChange={langs => mutate(data => data.languages = langs)}
                options={Object.entries(Languages).map(([value, label]) => ({ value, label }))} />
        </Accordion.Item>
    </Accordion.Root>;
}