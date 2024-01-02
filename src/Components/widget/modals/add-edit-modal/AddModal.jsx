import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { AddModalForm } from "./AddModalForm";

export const AddModal = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      {product ? (
        <button
          className="hover:underline text-blue-600"
          onClick={() => setOpenModal(true)}
        >
          ویرایش
        </button>
      ) : (
        <Button onClick={() => setOpenModal(true)}>افزودن کالا</Button>
      )}

      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        {" "}
        <Modal.Header />
        <Modal.Body>
          <AddModalForm setOpenModal={setOpenModal} product={product} />
        </Modal.Body>
      </Modal>
    </>
  );
};
