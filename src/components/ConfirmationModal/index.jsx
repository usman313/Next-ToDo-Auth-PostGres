'use client'

import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { AiFillDelete, AiFillWarning } from "react-icons/ai";

import Loader from '../Loader'

function ConfirmationModal({
    openModal, 
    setOpenModal,
    data,
    ...props
}) {
  const [isLoading, setIsLoading] = useState(false)
  const deleteTask = async ()=>{
    setIsLoading(true)
    const reponse = await fetch(`/api/delete-todo`,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({id: data?.id})
    }).then(()=>{
      setIsLoading(false)
      setOpenModal(undefined)
      props.callback()
    })
  }
  return (
      <Modal show={openModal === 'delete-modal'} onClose={() => setOpenModal(undefined)}>
        <Modal.Header>Delete Task</Modal.Header>
        <Modal.Body>
            <div className={" rounded-full w-[90px] h-[80px] bg-[#FFFAE3] flex items-center justify-center m-auto"}>
                <AiFillWarning color="#C7A90C" size={40} />
            </div>
            <h3 className={"my-2 text-[#C7A90C] text-center text-2xl"}>
                Delete {data?.title}
            </h3>
            <p className=" text-[#666666] text-center font-normal text-base my-2 px-5" >
                {`Are you sure you want to ${data?.task}?`}
            </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteTask}>
          {isLoading ? <div className='flex justify-center my-3'>
                            <Loader width='20'/>
                        </div>
                : 'Delete'
            }
          </Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ConfirmationModal