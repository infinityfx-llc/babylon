import { getAuthorId, getAuthorNames } from "@/lib/utils";
import { useForm } from "@infinityfx/control";
import { Button, DateField, Field, Modal } from "@infinityfx/fluid";
import { Author } from "@prisma/client";
import styles from './add-author.module.css';

export default function AddAuthor({ show, onClose, authors, setAuthors }: {
    show: boolean;
    onClose: () => void;
    authors: Author[];
    setAuthors: (authors: Author[]) => void;
}) {

    const form = useForm({
        initial: {
            firstName: '',
            lastName: '',
            born: new Date(),
            died: new Date(),
            nationality: ''
        },
        onSubmit({ firstName, lastName, born, died, nationality }) {
            const { fullName, name } = getAuthorNames({ firstName, lastName });

            setAuthors([...authors, {
                name,
                fullName,
                id: getAuthorId({ fullName, born, nationality }),
                born,
                died,
                nationality
            }]);

            onClose();
        }
    });

    return <Modal show={show} onClose={onClose} title="Add a new author" className={styles.modal}>
        <div className={styles.rows}>
            <Field label="First name" required {...form.fieldProps('firstName')} />
            <Field label="Last name" required {...form.fieldProps('lastName')} />
            <DateField label="Date of birth" required value={form.values.born} onChange={born => form.setValues({ born })} />
            <DateField label="Date of death" value={form.values.died} onChange={died => form.setValues({ died })} />
            <Field label="nationality" required {...form.fieldProps('nationality')} />

            <Button loading={form.submitting} onClick={() => form.submit()}>
                Add author
            </Button>
        </div>
    </Modal>;
}