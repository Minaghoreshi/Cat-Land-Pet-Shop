import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  removeAnOrder,
  updateBadge,
} from "../../../../features/user/userSlice";

export const CartDeleteModal = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (orderId) => {
    console.log(orderId);
    dispatch(removeAnOrder(orderId));
    dispatch(updateBadge());
    setOpenModal(false);
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="hover:underline text-selected"
      >
        حذف
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              «{data.name}» از لیست محصولات حذف شود؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(data._id)}>
                حذف
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                انصراف
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
