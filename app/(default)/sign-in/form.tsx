'use client';

import { ApiSignInRequest, ApiSignInResponse } from "@/app/api/sign-in/route";
import { source } from "@/lib/request";
import { useForm } from "@infinityfx/control";
import { Button, Field, PasswordField } from "@infinityfx/fluid";
import { useRouter } from "next/navigation";
import { IoLockClosed, IoMail } from "react-icons/io5";

export default function Form() {
    const router = useRouter();

    const form = useForm({
        initial: {},
        async onSubmit(values) {
            const { user } = await source<ApiSignInRequest, ApiSignInResponse>('/api/sign-in', values);

            if (!user) {

            } else {
                router.push('/profile');
            }
        }
    });

    return <>
        <Field type="email" label="Email" icon={<IoMail />} />
        <PasswordField label="Password" icon={<IoLockClosed />} />

        <Button loading={form.submitting} onClick={() => form.submit()}>
            Sign in
        </Button>
    </>
}