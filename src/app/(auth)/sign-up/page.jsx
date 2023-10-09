'use client'

import { Button, Label, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SignUp() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");
    const router = useRouter()

    function notify(){
        toast.success("User Registered!", {autoClose: 1000,});
    }
    const validatePassword = (newPassword) => {
        const specialCharsRegex = /[@#$%^&+=]/g;
        const digitRegex = /\d/g;
    
        const specialCharsCount = (newPassword.match(specialCharsRegex) || []).length;
    
        if (newPassword.length > 8 && specialCharsCount >= 2 && digitRegex.test(newPassword)) {
          setError("");
        } else {
          setError("Password must be at least 8 characters long, contain at least 2 special characters, and have 1 number.");
        }
      };

    const submitHandler= async (e)=>{
        setIsLoading(true)
        e.preventDefault();
        const response = await fetch(`/api/add-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        setIsLoading(false)
        if(response.status === 200){
            notify()
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }else{
            toast.error('User already exist', {autoClose: 1000})
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
                    onChange={(e)=>{
                        setPassword(e.target.value)
                        validatePassword(e.target.value)
                    }}
                    value={password}
                />
                <div className='text-red-500 w-[16rem] text-xs'>{error}</div>
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
                {isLoading ? <Loader width='25' className='m-0'/>
                : "Register"}
            </Button>
            <ToastContainer />
            </div>
        </form>
    )
}

export default SignUp