import React from "react";
import img from "../../../assets/nothing.jpg";
export const NothingToShow = () => {
  return (
    <div className="flex items-center">
      <span className="text-[30px] text-primary">
        شما هنوز سفارشی ثبت نکردید
      </span>
      <img className="rounded-lg" src={img} alt="nothing to show" />
    </div>
  );
};
