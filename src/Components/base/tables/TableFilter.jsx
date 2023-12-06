import React from "react";

export const TableFilter = () => {
  return (
    <div className="flex gap-10">
      <div className=" flex gap-3">
        {" "}
        <label>سفارش های ارسال شده</label>
        <input type="radio" />
      </div>
      <div className=" flex gap-3">
        {" "}
        <label>سفارش های در انتظار ارسال</label>
        <input type="radio" />
      </div>
    </div>
  );
};
