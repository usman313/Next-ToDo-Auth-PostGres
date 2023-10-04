'use client'

import React, { useState } from 'react'
import { 
  Button, 
  TextInput 
} from 'flowbite-react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";

function Home() {
  const [task, setTask]= useState()
  const submitHandler = ()=>{
    const response = fetch(`${process.env.NEXTAUTH_URL}/add-todo`, {
      method: POST,
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: {
        task: 'task'
      }
    })
  }
  return (
    <div className='w-full flex items-center justify-center px-48 py-14'>
      <div className=' w-full flex flex-col rounded-md shadow-lg bg-[#edfcfd] p-5'>
        <div className=' bg-white rounded-md p-2 mb-3'>
          <h3 className='text-center'>
            TODO LIST
          </h3>
        </div>

        <form onSubmit={submitHandler}>
          <div className='flex justify-between gap-4'>
            <div className=' w-full mr-3'>
              <TextInput
                id="newTask"
                placeholder="Write new to-do"
                required
                type="text"
                onChange={(e)=>setTask(e.target.value)}
                className=' h-full'
              />
            </div>
              <Button type='submit'>
                New
              </Button>
          </div>
        </form>

        <div className=' bg-[#c4f1f9] my-3 shadow-lg rounded-md px-3 py-2 grid grid-cols-4'>
          <div className=' col-span-3 place-items-center'>
            <h3 className=' text-[#0dbada] text-center font-normal text-xl'>
                Task 1
            </h3>
          </div>
          <div className='flex gap-4'>
            <Button
              outline
              pill
            >
              <RiDeleteBin6Line size={24} color='#e57eb5' />
            </Button>

            <Button
              outline
              pill
            >
              <AiOutlineEdit size={24} color='#e57eb5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home