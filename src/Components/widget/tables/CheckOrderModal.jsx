import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import { getOrderById } from "../../../api/orders/orders-api";
import { ModalTable } from "./ModalTable";
export const CheckOrderModal = ({ show, onClose, selectedOrder }) => {
  const columns = [
    { key: "product", label: "کالا", width: "w-3/5" },
    { key: "totalPrice", label: "قیمت" },
    { key: "count", label: "تعداد" },
  ];
  const [selectedId, setSelectedId] = useState(selectedOrder);
  const [orderData, setOrderData] = useState(null);
  const { data, error, isLoading } = useQuery(
    ["selectedOrder", selectedId],
    () => getOrderById(selectedId),
    { enabled: !!selectedId } // Enable the query only when selectedId is truthy
  );

  useEffect(() => {
    if (selectedOrder) {
      setSelectedId(selectedOrder);
    }
    if (data) {
      setOrderData(data);
    }
  }, [selectedOrder, data]);
  if (orderData) {
    console.log(orderData);
  }
  // console.log(data);
  return createPortal(
    <Modal show={show} onClose={onClose} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 flex flex-col ">
          {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3> */}
          {orderData ? (
            <>
              <div className="flex flex-col gap-3">
                <div className=" flex gap-5">
                  <span className="w-[100px]">نام مشتری</span>
                  <span>
                    {orderData.user.firstname} {orderData.user.lastname}
                  </span>
                </div>{" "}
                <div className=" flex gap-5">
                  <span className="w-[100px]">آدرس </span>
                  <span>{orderData.user.address}</span>
                </div>{" "}
                <div className=" flex gap-5">
                  <span className="w-[100px]">تلفن </span>
                  <span>{orderData.user.phoneNumber}</span>
                </div>{" "}
                <div className=" flex gap-5">
                  <span className="w-[100px]">زمان تحویل</span>
                  <span>
                    {new Intl.DateTimeFormat("fa-IR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      timeZone: "Asia/Tehran",
                    }).format(new Date(orderData.deliveryDate))}
                  </span>
                </div>{" "}
                <div className=" flex gap-5">
                  <span className="w-[100px]">زمان سفارش</span>
                  <span>
                    {new Intl.DateTimeFormat("fa-IR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      timeZone: "Asia/Tehran",
                    }).format(new Date(orderData.createdAt))}
                  </span>
                </div>
              </div>{" "}
              <ModalTable
                columns={columns}
                product={orderData.products[0].product.name}
                count={orderData.products[0].count}
                totalPrice={orderData.totalPrice}
              />
              {orderData.deliveryStatus ? (
                <div className="flex justify-center">
                  <span>
                    تاریخ تحویل{" "}
                    {new Intl.DateTimeFormat("fa-IR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      timeZone: "Asia/Tehran",
                    }).format(new Date(orderData.deliveryDate))}
                  </span>{" "}
                </div>
              ) : (
                <div className="flex justify-center">
                  <Button className="w-1/2">تحویل شد</Button>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </Modal.Body>
    </Modal>,
    document.getElementById("modal-root")
  );
};
