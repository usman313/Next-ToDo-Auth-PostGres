'use client'

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';

function SignUp() {
    return (
        <form className=" m-24 flex max-w-2xl flex-col gap-4 bg-white p-10 rounded-md shadow-md">
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="email2"
                        value="Your email"
                    />
                </div>
                <TextInput
                    id="email2"
                    placeholder="name@flowbite.com"
                    required
                    shadow
                    type="email"
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="password2"
                        value="Your password"
                    />
                </div>
                <TextInput
                    id="password2"
                    required
                    shadow
                    type="password"
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="repeat-password"
                        value="Repeat password"
                    />
                </div>
                <TextInput
                    id="repeat-password"
                    required
                    shadow
                    type="password"
                />
            </div>
            <div className="flex justify-center items-center gap-2">
                <Link
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/"
                >
                    <p>
                        Already User
                    </p>
                </Link>
            </div>
            <Button type="submit">
                Register new account
            </Button>
        </form>
    )
}

export default SignUp