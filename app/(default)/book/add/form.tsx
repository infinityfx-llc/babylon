'use client';

import { ApiBookAdd } from '@/app/api/book/add/route';
import { source } from '@/lib/request';
import { Genres, BookTypes, Languages } from '@/lib/types';
import { resizeImage } from '@/lib/utils';
import { Validate } from '@/lib/validate';
import { useForm } from '@infinityfx/control';
import { DateField, Field, NumberField, Select, Textarea, Button, FileField, Tabs, Tooltip } from '@infinityfx/fluid';
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
            author: '' as Author | '',
            genre: '' as keyof typeof Genres | '',
            description: '',
            editions: [
                {
                    id: '',
                    type: '' as BookType | '',
                    published: undefined as Date | undefined,
                    coverImage: '',
                    pages: 0,
                    language: ''
                }
            ]
        },
        onValidate(values) {
            return new Validate(values)
                .req('title')
                .req('author')
                .req('description')
                .in('genre', Genres)
                .do('editions', function (editions) {
                    if (editions.some(edition => edition.id.length < 13 ||
                        !edition.published ||
                        !edition.language ||
                        !edition.coverImage ||
                        !edition.language)) return 'One or more editions are invalid.';
                }).errors;
        },
        onSubmit: async (values: ApiBookAdd[1]) => {
            const { request } = await source<ApiBookAdd>('/api/book/add', values);

            if (!request) {
                alert('Something went wrong, please try again!');
            } else {
                form.reset();
                alert('Addition requested!');
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
                searchable
                error={form.touched.genre && form.errors.genre}
                options={Object.entries(Genres).map(([value, label]) => ({ value, label }))}
                value={form.values.genre}
                onChange={genre => form.setValues({ genre })} />

            <div className={styles.row}>
                <Select label="Author"
                    searchable
                    error={form.touched.author && form.errors.author}
                    value={typeof form.values.author === 'string' ? '' : form.values.author.id}
                    onChange={val => form.setValues({ author: authorList.find(author => author.id === val) })}
                    options={authorList.map(author => ({ label: author.name, value: author.id }))} />

                <Tooltip content="Add a new author">
                    <Button variant="neutral"
                        style={{ flexGrow: 0, flexBasis: 'auto', alignSelf: 'flex-end' }}
                        onClick={() => toggleAuthorModal(!showAuthorModal)}>
                        <IoAdd />
                    </Button>
                </Tooltip>
            </div>
        </div>

        <Textarea label="Description"
            rows={5}
            resize="vertical"
            {...form.fieldProps('description')} />

        <div className={styles.row}>
            <Tabs
                value={editionIndex}
                onChange={setEditionIndex}
                options={editions.map((_, i) => ({ label: `Edition ${i + 1}`, value: i }))} />

            <Tooltip content="Add edition">
                <Button
                    variant="neutral"
                    size="lrg"
                    style={{ flexGrow: 0, flexBasis: 'auto', paddingInline: '.85em' }}
                    onClick={() => form.setValues({
                        editions: [...editions, Object.assign({}, editions[editions.length - 1])]
                    })}>
                    <IoAdd />
                </Button>
            </Tooltip>
        </div>

        {editions.map((edition, i) => {
            if (i !== editionIndex) return null;

            return <Fragment key={i}>
                <div className={styles.row}>
                    <NumberField label="ISBN"
                        precision={0}
                        controls={false}
                        showError
                        error={form.touched.editions && form.errors.editions}
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
                    <FileField label="Cover image"
                        accept="image/png, image/jpeg"
                        onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                                resizeImage(file, 45, 64)
                                    .then(base64 => setEditionField(i, 'coverImage', base64 || ''));
                            } else {
                                setEditionField(i, 'coverImage', '');
                            }
                        }} />
                    <NumberField label="Page count"
                        precision={0}
                        value={edition.pages}
                        onChange={e => setEditionField(i, 'pages', parseInt(e.target.value))} />
                    <Select label="Language"
                        searchable
                        options={Object.entries(Languages).map(([value, label]) => ({ value, label }))}
                        value={edition.language}
                        onChange={val => setEditionField(i, 'language', val)} />
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