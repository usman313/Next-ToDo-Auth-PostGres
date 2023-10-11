'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FiFacebook } from 'react-icons/fi';

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
  const [isLoading, setIsLoading] = useState(false)
  const [checkUserLogin, setCheckUserLogin] = useState(true)
  const [providers, setProviders] = useState(null)
  const session = useSession();
  const router = useRouter()

  const submitHandler = async (e)=>{
    setIsLoading(true)
    e.preventDefault()
    const response = await signIn('credentials', {
      email : email ,
      password : password,
      redirect: true,
      callbackUrl: '/'
    })
  }
  useEffect(()=>{
    // console.log('created google session: ', session)
    if(session && session.status === 'authenticated'){
      setIsLoading(false)
      setCheckUserLogin(false);
      router.push("/home");
    } else {
      setCheckUserLogin(false);
    }

  }, [session, router])
  useEffect(()=>{
    const setProvider=async ()=>{
      const response = await getProviders();
      setProviders(response)
    }
    setProvider()
  }, [])
  if(checkUserLogin){
    return (
      <div className=' h-screen w-full justify-center items-center'>
        <Loader color='#b3d4ff' visible={checkUserLogin}/>
      </div>
    )
  }
  return (
    
      <div className='m-24 bg-white p-10 rounded-md shadow-md'>
        <form 
          onSubmit={submitHandler}
          className="flex max-w-2xl flex-col gap-4 "
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
              placeholder='Enter Password'
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
            {isLoading ? <Loader width='25' />
            : "Sign in"}
          </Button>
        </form>
        <div className='flex flex-col justify-center mt-3 items-center'>
          <p>
            Sign In with:
          </p>
            <div className='flex gap-3'>
              <Button
                outline
                pill
                onClick={() => signIn("google")}
              >
                  <FcGoogle size={24}/>
              </Button>

              <Button
                outline
                pill
                onClick={() => signIn("facebook")}
              >
                  <FiFacebook size={24}/>
              </Button>
            </div>
        </div>
      </div>
    
  )
}
