import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
export const CustomerHeader = () => {
  let navigate = useNavigate();
  return (
    <header className="flex px-9 py-5 bg-primary text-white items-center justify-between">
      <h1 className=" font-bold text-[60px] ">کت لند</h1>
      <div className="flex gap-8 justify-self-end text-2xl">
        <button
          onClick={() => {
            navigate("/admin-login");
          }}
        >
          {" "}
          مدیریت
        </button>
        <button
          onClick={() => {
            navigate("/cart");
          }}
          className="flex items-center gap-2"
        >
          {" "}
          <Icon icon="mdi:cart-outline" color="white" /> سبد خرید
        </button>
      </div>
    </header>
  );
};
