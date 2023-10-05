'use client'

import { Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SignUp() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const router = useRouter()

    const submitHandler= async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/add-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        if(response.status === 200){
            router.push('/')
        }
    }
    return (
        <form onSubmit={submitHandler} >
            <div className=" m-24 flex max-w-2xl flex-col gap-4 bg-white p-10 rounded-md shadow-md">
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="email2"
                        value="Your email"
                    />
                </div>
                <TextInput
                    id="email"
                    placeholder="name@flowbite.com"
                    required
                    shadow
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
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
                    id="password"
                    required
                    shadow
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
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
            </div>
        </form>
    )
}

export default SignUp