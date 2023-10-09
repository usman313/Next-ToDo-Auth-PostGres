'use client'

import React from 'react'
import { BsMeta } from "react-icons/bs";
import {Button} from '../index'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Navbar() {
    const session = useSession()
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/home" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><BsMeta size={50} color='#619efa'/></span>
                </a>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <div className='flex items-center gap-4'>
                                <div className=' rounded-full'>
                                    <Image
                                        src={'/images/avatar.png'}
                                        alt=' '
                                        width={50}
                                        height={50}
                                        style={{
                                            width: '50px',
                                            height: '50px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className=' capitalize text-base'>
                                        {session?.data?.user?.response?.data?.[0]?.email}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Button 
                                outline
                                onClick={()=>signOut()}
                            >
                                Sign out
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar