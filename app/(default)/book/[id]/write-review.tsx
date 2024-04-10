'use client';

import { ApiBookReviewRequest, ApiBookReviewResponse } from '@/app/api/book/review/route';
import { source } from '@/lib/request';
import { useForm } from '@infinityfx/control';
import { Textarea, Button, Segmented } from '@infinityfx/fluid';
import styles from './write-review.module.css';

export default function WriteReview({ bookId }: { bookId: string; }) {

    const form = useForm({
        initial: {
            rating: 80,
            text: ''
        },
        async onSubmit(values) {
            const { review } = await source<ApiBookReviewRequest, ApiBookReviewResponse>('/api/book/review', { ...values, bookId });

            if (!review) {
                form.setErrors({ text: 'Something went wrong, please try again' });
            } else {
                // mutate data
                form.reset();
            }
        }
    });

    return <div className={styles.wrapper}>
        <h3>Give a rating</h3>

        <Segmented
            options={new Array(10).fill(0).map((_, i) => ({ label: i + 1, value: i + 1 }))}
            value={form.values.rating / 10}
            onChange={val => form.setValues({ rating: val * 10 })} />

        <Textarea resize="vertical" label="Review (optional)"
            value={form.values.text}
            onChange={e => form.setValues({ text: e.target.value })} />

        <Button loading={form.submitting} onClick={() => form.submit()}>
            Rate this book
        </Button>
    </div>
}