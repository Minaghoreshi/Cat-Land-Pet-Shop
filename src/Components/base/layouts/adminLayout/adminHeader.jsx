import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavButton } from "./adminNavButton";
import logo from "../../../../assets/9005223.jpg";
import { logOut } from "../../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
export const AdminHeader = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const returnHome = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <header className="flex px-9 py-5 bg-primary text-secondary items-center justify-between w-full mb-20">
      <h1 className=" font-bold text-[30px] ">پنل مدیریت فروشگاه کت لند</h1>
      {/* <div>
        <img
          onClick={returnHome}
          className="w-24 h-24 cursor-pointer"
          src={logo}
          alt="logo"
        />
      </div> */}
      <AdminNavButton />
      <div className="flex gap-8 justify-self-end text-2xl ">
        <button onClick={returnHome}>بازگشت به سایت</button>
      </div>
    </header>
  );
};
