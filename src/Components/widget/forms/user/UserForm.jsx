import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./login-form/loginSchema";
import { SignUpForm } from "./sign-up/SignUpForm";
import { UserLoginForm } from "./login-form";
export const UserForm = () => {
  const [isLoging, setIsLoging] = useState(true);
  let navigate = useNavigate();

  const handleChangeToSignUp = () => {
    setIsLoging((prev) => !prev);
  };
  return (
    <div className="text-primary w-1/4 rounded-2xl text-lg py-6 shadow-2xl flex flex-col gap-6 item">
      {isLoging ? (
        <UserLoginForm />
      ) : (
        <SignUpForm handleChangeToSignUp={handleChangeToSignUp} />
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
  );
};
