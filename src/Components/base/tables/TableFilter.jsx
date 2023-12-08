import React, { useEffect, useState } from "react";

export const TableFilter = ({ handleStatusChange, deliveryStatus }) => {
  const [isNotDelivered, setIsNotDelivered] = useState(deliveryStatus);
  useEffect(() => {
    handleStatusChange(isNotDelivered);
  }, [isNotDelivered, handleStatusChange]);
  return (
    <div className="flex gap-10">
      <div className=" flex gap-3">
        {" "}
        <label>سفارش های ارسال شده</label>
        <input
          type="radio"
          checked={isNotDelivered}
          onChange={() => {
            setIsNotDelivered(true);
          }}
        />
      </div>
      <div className=" flex gap-3">
        {" "}
        <label>سفارش های در انتظار ارسال</label>
        <input
          type="radio"
          checked={!isNotDelivered}
          onChange={() => {
            setIsNotDelivered(false);
          }}
        />
      </div>
    </div>
  );
};
