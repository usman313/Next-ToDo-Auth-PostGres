'use client'
import React, { useEffect, useState } from 'react'
import { 
  Button, 
  TextInput 
} from 'flowbite-react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { ConfirmationModal, GenericModal } from '@/components';

function Home() {
  const [task, setTask]= useState()
  const [taskList, setTaskList] = useState()
  const [openModal, setOpenModal] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(undefined);
  const [selectedTask, setSelectedTask] = useState()

  useEffect(()=>{
    const getData = async ()=>{
      const response = await fetch(`/app/api/get-task-list`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const myTasks = await response.json()
      setTaskList(myTasks?.data)
    }
    getData()
  },[])
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/app/api/add-todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: task,
      }),
    });
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
                value={task}
                onChange={(e)=>setTask(e.target.value)}
                className=' h-full'
              />
            </div>
              <Button type='submit'>
                New
              </Button>
          </div>
          </form>

          {taskList?.map((item) => {
          return (
              <div key={item?.id} className=" bg-[#c4f1f9] my-3 shadow-lg rounded-md px-3 py-2 grid grid-cols-4">
                <div className=" col-span-3 place-items-center">
                  <h3 className=" text-[#0dbada] flex items-center justify-center font-normal text-xl">
                    {item?.task}
                  </h3>
                </div>
                <div className="flex gap-4">
                  <Button outline pill>
                    <RiDeleteBin6Line
                      size={24}
                      color="#e57eb5"
                      onClick={() => {
                        setDeleteModal("delete-modal")
                        setSelectedTask(item)
                      }}
                    />
                  </Button>

                  <Button
                    outline
                    pill
                    onClick={() => {
                      setOpenModal("edit-todo")
                      setSelectedTask(item)
                    }}
                  >
                    <AiOutlineEdit size={24} color="#e57eb5" />
                  </Button>
                </div>
              </div>
          );
        })}
      </div>
      {openModal &&
        <GenericModal
          title='Title Here'
          data={selectedTask}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      }
      {setDeleteModal &&
        <ConfirmationModal
          title='Delete Todo'
          data={selectedTask}
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
        />
      }
    </div>
  )
}

export default Home