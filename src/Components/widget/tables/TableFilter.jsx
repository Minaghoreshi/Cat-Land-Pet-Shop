import React, { useEffect, useState } from "react";

export const TableFilter = ({
  handleStatusChange,
  deliveryStatus,
  setCurrentPage,
}) => {
  const [isNotDelivered, setIsNotDelivered] = useState(deliveryStatus);

  useEffect(() => {
    handleStatusChange(isNotDelivered);
  }, [isNotDelivered, handleStatusChange]);

  const handleChangeStatus = (status) => {
    setIsNotDelivered(status);
    handleStatusChange(status);
    setCurrentPage(1);
  };

  return (
    <div className="flex gap-10">
      <div className="flex gap-3">
        <label>سفارش های ارسال شده</label>
        <input
          type="radio"
          checked={isNotDelivered}
          onChange={() => handleChangeStatus(true)}
        />
      </div>
      <div className="flex gap-3">
        <label>سفارش های در انتظار ارسال</label>
        <input
          type="radio"
          checked={!isNotDelivered}
          onChange={() => handleChangeStatus(false)}
        />
      </div>
    </div>
  );
};
