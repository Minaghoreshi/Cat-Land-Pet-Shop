import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavButton } from "./adminNavButton";
export const AdminHeader = () => {
  let navigate = useNavigate();
  return (
    <header className="flex px-9 py-5 bg-primary text-white items-center justify-between w-full">
      <h1 className=" font-bold text-[60px] ">پنل مدیریت فروشگاه کت لند</h1>
      <AdminNavButton />
      <div className="flex gap-8 justify-self-end text-2xl">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          بازگشت به سایت
        </button>
      </div>
    </header>
  );
};
