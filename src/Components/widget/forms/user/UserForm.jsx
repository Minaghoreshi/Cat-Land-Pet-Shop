import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "./sign-up/SignUpForm";
import { UserLoginForm } from "./login-form";
import { Toastify } from "../../../base/toast/Toastify";

export const UserForm = () => {
  const [toastifyVisible, setToastifyVisible] = useState(false);

  const [isLoging, setIsLoging] = useState(true);
  let navigate = useNavigate();

  const handleChangeToSignUp = () => {
    setIsLoging((prev) => !prev);
  };
  return (
    <>
      {" "}
      {toastifyVisible ? (
        <Toastify text={"خوش آمدید"} color={"bg-success"} position={"top-0"} />
      ) : (
        ""
      )}
      <div className="text-primary w-1/4 rounded-2xl text-lg py-6 shadow-2xl flex flex-col gap-6 item justify-center">
        {isLoging ? (
          <UserLoginForm setToastifyVisible={setToastifyVisible} />
        ) : (
          <SignUpForm
            handleChangeToSignUp={handleChangeToSignUp}
            setToastifyVisible={setToastifyVisible}
          />
        )}{" "}
        <div className="flex justify-between px-6">
          {" "}
          <span
            className=" text-right text-cyan-800 cursor-pointer"
            onClick={handleChangeToSignUp}
            href="/"
          >
            {isLoging ? "ایجاد حساب کاربری" : "قبلا ثبت نام کرده اید؟"}
          </span>
          <span
            onClick={() => {
              navigate("/");
            }}
            href="/"
            className="text-selected cursor-pointer  "
          >
            بازگشت به سایت
          </span>
        </div>
      </div>
    </>
  );
};
