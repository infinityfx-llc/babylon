'use client';

import { ApiBookAddRequest, ApiBookAddResponse } from '@/app/api/book/add/route';
import { source } from '@/lib/request';
import { Genres, BookTypes } from '@/lib/types';
import { useForm } from '@infinityfx/control';
import { DateField, Field, NumberField, Select, Textarea, Button, FileField, Tabs } from '@infinityfx/fluid';
import { Author, BookType } from '@prisma/client';
import { useState, Fragment } from 'react';
import { IoAdd } from 'react-icons/io5';
import AddAuthor from './add-author';
import styles from './page.module.css';

export default function Form({ authors }: { authors: Author[]; }) {
    const [showAuthorModal, toggleAuthorModal] = useState(false);
    const [authorList, setAuthorList] = useState(authors);
    const [editionIndex, setEditionIndex] = useState(0);

    const form = useForm({
        initial: {
            title: '',
            author: { id: '' } as Author,
            genre: 'biography' as keyof typeof Genres,
            description: '',
            editions: [
                {
                    id: '',
                    type: 'paperback' as BookType,
                    published: new Date(),
                    coverImage: undefined,
                    pages: 0,
                    language: ''
                }
            ]
        },
        onValidate(values) {
            if (!values.author) return { author: 'Please select an author' };

            return {};
        },
        async onSubmit(values) {
            const { book } = await source<ApiBookAddRequest, ApiBookAddResponse>('/api/book/add', values);

            if (!book) {

            } else {
                form.reset();
            }
        }
    });

    const editions = form.values.editions;

    type Edition = (typeof form.values.editions)[number];
    function setEditionField<T extends keyof Edition>(index: number, field: T, value: Edition[T]) {
        editions[index][field] = value;

        form.setValues({
            editions: [...editions]
        });
    }

    return <>
        <AddAuthor
            show={showAuthorModal}
            onClose={() => toggleAuthorModal(false)}
            authors={authorList}
            setAuthors={setAuthorList} />

        <div className={styles.row}>
            <Field label="Title" {...form.fieldProps('title')} />
            <Select label="Genre"
                options={Object.entries(Genres).map(([value, label]) => ({ value, label }))}
                value={form.values.genre}
                onChange={genre => form.setValues({ genre })} />

            <div className={styles.row}>
                <Select label="Author"
                    searchable
                    value={form.values.author.id}
                    onChange={val => form.setValues({ author: authorList.find(author => author.id === val) })}
                    options={authorList.map(author => ({ label: author.name, value: author.id }))} />

                <Button variant="neutral" size="lrg"
                    style={{ flexGrow: 0, flexBasis: 'auto', alignSelf: 'flex-end' }}
                    onClick={() => toggleAuthorModal(!showAuthorModal)}>
                    <IoAdd />
                </Button>
            </div>
        </div>

        <Textarea label="Description"
            value={form.values.description}
            onChange={e => form.setValues({ description: e.target.value })} />

        <div className={styles.row}>
            <Tabs
                value={editionIndex}
                onChange={setEditionIndex}
                options={editions.map((_, i) => ({ label: `Edition ${i + 1}`, value: i }))} />

            <Button
                variant="neutral"
                style={{ flexGrow: 0, flexBasis: 'auto', paddingInline: '1em' }}
                onClick={() => form.setValues({
                    editions: [...editions, Object.assign({}, editions[editions.length - 1])]
                })}>
                Add edition
            </Button>
        </div>

        {editions.map((edition, i) => {
            if (i !== editionIndex) return null;

            return <Fragment key={i}>
                <div className={styles.row}>
                    <NumberField label="ISBN"
                        precision={0}
                        controls={false}
                        value={edition.id}
                        onChange={e => setEditionField(i, 'id', e.target.value)} />
                    <Select label="Type"
                        options={Object.entries(BookTypes).map(([value, label]) => ({ value, label }))}
                        value={edition.type}
                        onChange={val => setEditionField(i, 'type', val)} />
                    <DateField label="Release date"
                        value={edition.published}
                        onChange={val => setEditionField(i, 'published', val)} />
                </div>

                <div className={styles.row}>
                    <FileField label="Cover image" accept="image/png, image/jpeg" />
                    <NumberField label="Page count"
                        precision={0}
                        value={edition.pages}
                        onChange={e => setEditionField(i, 'pages', parseInt(e.target.value))} />
                    <Field label="Language"
                        value={edition.language}
                        onChange={e => setEditionField(i, 'language', e.target.value)} />
                </div>
            </Fragment>;
        })}

        <Button
            loading={form.submitting}
            onClick={() => form.submit()}>
            Request addition
        </Button>
    </>
}