'use client'
import React, { useEffect, useState } from 'react'
import { 
  Button, 
  TextInput 
} from 'flowbite-react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { ConfirmationModal, GenericModal, Loader } from '@/components';
import { useSession } from 'next-auth/react';

function Home() {
  const [task, setTask]= useState()
  const [taskList, setTaskList] = useState([])
  const [openModal, setOpenModal] = useState(undefined);
  const [deleteModal, setDeleteModal] = useState(undefined);
  const [selectedTask, setSelectedTask] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const session = useSession();
  const studentId = session?.data?.user?.id

  useEffect(()=>{
    const getData = async ()=>{
      const response = await fetch(`/api/get-task-list?std_id=${studentId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const myTasks = await response.json()
      setTaskList(myTasks?.data)
      setIsLoading(false)
    }
    getData()
  },[])
  
  const moveNext = async ()=>{
    setIsLoading(true)
    const response = await fetch(`/api/get-task-list?std_id=${studentId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const myTasks = await response.json()
    setTaskList(myTasks?.data)
    setIsLoading(false)
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      task: task,
      std_id: studentId
    }
    const response = await fetch(`/api/add-todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({payload}),
    }).finally(
      moveNext()
    );
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

          {isLoading ? <div className='flex justify-center my-3'>
                        <Loader width='60'/>
                      </div>
          : taskList?.map((item) => {
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
          {!taskList.length && !isLoading &&
            <h3 className='text-center my-3'>
              No Task in list
            </h3>
          }
      </div>
      {openModal &&
        <GenericModal
          title='Title Here'
          data={selectedTask}
          openModal={openModal}
          setOpenModal={setOpenModal}
          callback={moveNext}
        />
      }
      {setDeleteModal &&
        <ConfirmationModal
          title='Delete Todo'
          data={selectedTask}
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
          callback={moveNext}
        />
      }
    </div>
  )
}

export default Home