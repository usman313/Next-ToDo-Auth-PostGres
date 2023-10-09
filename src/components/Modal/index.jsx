'use client'

import React, { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';

import Loader from '../Loader'

function GenericModal({
    data,
    openModal,
    setOpenModal,
    ...props
}) {
    const [newTitle, setNewTitle] = useState(data?.title)
    const [newDescription, setNewDescription] = useState(data?.description)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const editConfirmation = async ()=>{
        setIsLoading(true)
        const response = await fetch(`/api/edit-todo`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id:data.id, 
            title: newTitle, 
            description: newDescription,
            status: 'In Progress'
        })
    }).then(()=>{
        setIsLoading(false)
        setOpenModal(undefined)
        props.callback()
    })
    }

    return (
        <Modal show={openModal === 'edit-todo'} size="md" popup onClose={() => setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Edit  {data?.title}
                    </h3>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="todo-title"
                                value='Title'
                            />
                        </div>
                        <TextInput
                            id="todo-title"
                            defaultValue={data?.title}
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="todo-description"
                                value="Description"
                            />
                        </div>
                        <TextInput
                            id="todo-description"
                            type="text"
                            defaultValue={data?.task}
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex justify-end gap-3">
                        <Button
                            onClick={editConfirmation}
                        >
                            {isLoading ? <div className='flex justify-center my-3'>
                                            <Loader width='20'/>
                                        </div>
                                : 'Edit'
                            }
                        </Button>
                        <Button onClick={() => setOpenModal(undefined)}>Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default GenericModal