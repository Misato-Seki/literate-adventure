"use client"

import { useRouter } from 'next/navigation';
import { ReactElement } from "react";
import { useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import { FormEvent } from "react";
import { login, LoginResponse } from "../actions/login";

export default function LoginForm(): ReactElement {
    const [ isPending, setIsPending ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result: LoginResponse = await login({email, password});

        setIsPending(false);

        if (result.success) {
            router.push("/admin");
        } else {
            setError(result.error || "something went wrong");
        }

    }

    return (
        <div className="flex min-h-full flex-col justify-center items-center gap-8">
            <h1 className="text-2xl">login form</h1>
            <div className="w-[50vw] mx-auto">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">E-mail</label>
                    <input name="email" id="email" type="email" className="textInput w-full"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" type="password" className="textInput w-full"/>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <SubmitButton text="Login" loading={isPending} />
            </form>
            </div>
        </div>
    );
}