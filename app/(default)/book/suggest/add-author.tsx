import { getAuthorId, getAuthorNames } from "@/lib/utils";
import { useForm } from "@infinityfx/control";
import { Annotation, Button, DateField, Field, Modal } from "@infinityfx/fluid";
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
            born: null as Date | null,
            died: null as Date | null,
            nationality: ''
        },
        onSubmit({ firstName, lastName, born, died, nationality }: any) {
            const { fullName, name } = getAuthorNames({ firstName, lastName });

            setAuthors([...authors, {
                name,
                fullName,
                id: getAuthorId({ fullName, born, nationality }),
                born,
                died,
                nationality
            }]);

            form.reset();
            onClose();
        }
    });

    return <Modal show={show} onClose={onClose} title="Add a new author" className={styles.modal}>
        <div className={styles.rows}>
            <Annotation label="First name">
                <Field required {...form.fieldProps('firstName')} />
            </Annotation>
            <Annotation label="Last name">
                <Field required {...form.fieldProps('lastName')} />
            </Annotation>
            <Annotation label="Date of birth">
                <DateField required value={form.values.born} onChange={born => form.setValues({ born })} />
            </Annotation>
            <Annotation label="Date of death">
                <DateField
                    clearable
                    value={form.values.died}
                    onChange={died => form.setValues({ died })} />
            </Annotation>
            <Annotation label="nationality">
                <Field required {...form.fieldProps('nationality')} />
            </Annotation>

            <Button loading={form.submitting} onClick={() => form.submit()}>
                Add author
            </Button>
        </div>
    </Modal>;
}