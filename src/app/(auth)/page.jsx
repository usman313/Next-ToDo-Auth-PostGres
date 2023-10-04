'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { 
  Button, 
  Checkbox, 
  Label, 
  TextInput 
} from 'flowbite-react';
import { Loader } from '@/components';

export default function Home() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [checkUserLogin, setCheckUserLogin] = useState(true)
  const session = useSession();
  const router = useRouter()

  const submitHandler = async (e)=>{
    e.preventDefault()
    const response = await signIn('credentials', {
      email : email ,
      password : password,
      redirect: true,
      callbackUrl: '/home'
    })
  }
  useEffect(()=>{
    if(session && session.status === 'authenticated'){
      setCheckUserLogin(false);
      router.push("/home");
    } else {
      setCheckUserLogin(false);
    }
  }, [session, router])
  if(checkUserLogin){
    return <Loader color='##b3d4ff' loading={checkUserLogin}/>
  }
  return (
    <div className='m-24'>
      <form 
        onSubmit={submitHandler}
        className="flex max-w-2xl flex-col gap-4 bg-white p-10 rounded-md shadow-md"
      >
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email"
              value="Your email"
            />
          </div>
          <TextInput
            id="email"
            placeholder="email@user.com"
            required
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password1"
              value="Your password"
            />
          </div>
          <TextInput
            id="password"
            required
            type="password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <div className="flex justify-between ">
          <div>
            <Checkbox id="remember" className=' mr-2'/>
            <Label htmlFor="remember">
              Remember me
            </Label>
          </div>
          <div>
            <Link
              className="text-cyan-600 underline"
              href="/sign-up"
            >
              <p>
                Signup
              </p>
            </Link>
          </div>
        </div>
        <Button type="submit">
          Sign in
        </Button>
      </form>
    </div>
  )
}
