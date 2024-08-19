'use client';

import { ApiSignIn } from "@/app/api/sign-in/route";
import { source } from "@/lib/request";
import { useForm } from "@infinityfx/control";
import { Annotation, Button, Field, PasswordField } from "@infinityfx/fluid";
import { useRouter } from "next/navigation";
import { IoLockClosed, IoMail } from "react-icons/io5";

export default function Form() {
    const router = useRouter();

    const form = useForm({
        initial: {
            email: '',
            password: ''
        },
        async onSubmit(values) {
            const { errors } = await source<ApiSignIn>('/api/sign-in', values);

            if (errors) {
                form.setErrors(errors);
            } else {
                router.push('/profile');
            }
        }
    });

    return <>
        <Annotation label="Email">
            <Field type="email" icon={<IoMail />} {...form.fieldProps('email')} />
        </Annotation>
        <Annotation label="Password">
            <PasswordField icon={<IoLockClosed />} {...form.fieldProps('password')} onEnter={form.submit} />
        </Annotation>

        <Button loading={form.submitting} onClick={() => form.submit()}>
            Sign in
        </Button>
    </>
}