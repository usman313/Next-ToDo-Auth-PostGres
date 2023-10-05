'use client'

import { Button, Modal } from 'flowbite-react';
import { AiFillDelete, AiFillWarning } from "react-icons/ai";

function ConfirmationModal({
    title='title',
    openModal, 
    setOpenModal,
    description='Description'
}) {

  return (
      <Modal show={openModal === 'delete-modal'} onClose={() => setOpenModal(undefined)}>
        <Modal.Header>Delete Task</Modal.Header>
        <Modal.Body>
            <div className={" rounded-full w-[90px] h-[80px] bg-[#FFFAE3] flex items-center justify-center m-auto"}>
                <AiFillWarning color="#C7A90C" size={40} />
            </div>
            <h3 className={"my-2 text-[#C7A90C] text-center text-2xl"}>
                Update {title && title}
            </h3>
            <p className=" text-[#666666] text-center font-normal text-base my-2 px-5" >
                {`Are you sure you want to ${description && " " + description
                }?`}
            </p>
        </Modal.Body>
        <Modal.Footer>
          <Button >Delete</Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ConfirmationModal