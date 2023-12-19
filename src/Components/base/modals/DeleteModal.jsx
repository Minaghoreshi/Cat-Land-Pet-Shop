import React from "react";
import { useQueryClient } from "react-query";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deletProduct } from "../../../api/products/products-api";
export const DeleteModal = ({ data }) => {
  const queryClient = useQueryClient();
  const handleDelete = async (productId) => {
    try {
      const result = await deletProduct(productId);
      if (result && result === 200) {
        queryClient.invalidateQueries("products");

        setOpenModal(false);
      } else {
        console.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
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
