'use client'

import React, { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

function GenericModal({
    title = 'Title Here',
    data,
    openModal,
    setOpenModal,
}) {
    const [newTitle, setNewTitle] = useState(data?.title)
    const [newDescription, setNewDescription] = useState(data?.description)

    return (
        <Modal show={openModal === 'edit-todo'} size="md" popup onClose={() => setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="todo-title"
                                value="Todo Tiel"
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
                            defaultValue={data?.description}
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex justify-end gap-3">
                        <Button>Edit</Button>
                        <Button onClick={() => setOpenModal(undefined)}>Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default GenericModal