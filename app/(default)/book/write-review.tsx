import { ApiBookReview } from '@/app/api/book/review/route';
import { useToast } from '@/context/toast';
import { source } from '@/lib/request';
import { useForm } from '@infinityfx/control';
import { Textarea, Button, NumberField } from '@infinityfx/fluid';
import { useRouter } from 'next/navigation';
import { IoAlert } from 'react-icons/io5';
import styles from './write-review.module.css';

export default function WriteReview({ bookId, mutate }: { bookId: string; mutate: () => void; }) {
    const router = useRouter();
    const notify = useToast();

    const form = useForm({
        initial: {
            rating: 80,
            text: ''
        },
        async onSubmit(values) {
            const { errors } = await source<ApiBookReview>('/api/book/review', { ...values, bookId });

            if (errors) {
                form.setErrors(errors);

                if (errors.generic) notify({
                    title: errors.generic,
                    color: 'red',
                    icon: <IoAlert />
                });
            } else {
                mutate();
                router.refresh();
                form.reset();
            }
        }
    });

    return <div className={styles.wrapper}>
        <NumberField
            label="Rating"
            min={1}
            max={10}
            precision={1}
            value={form.values.rating / 10}
            onChange={e => form.setValues({ rating: parseFloat(e.target.value) * 10 })} />

        <Textarea
            resize="vertical"
            label="Review"
            value={form.values.text}
            onChange={e => form.setValues({ text: e.target.value })} />

        <Button loading={form.submitting} onClick={() => form.submit()}>
            Rate this book
        </Button>
    </div>
}