import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "./loginSchema";
import { store } from "../../../../../store";
import { userLogin } from "../../../../../features/user/userThunk";

export const UserLoginForm = ({ setToastifyVisible }) => {
  const [loadingError, setLoadingError] = useState(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    LoginSchema,
    onSubmit: (values) => {
      dispatch(userLogin(values))
        .then(() => {
          const isLogin = store.getState().user.isLogin;
          if (isLogin) {
            setLoadingError((prev) => null);
            setToastifyVisible((prev) => !prev);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            setLoadingError("نام کاربری یا رمز عبور اشتباه است");
          }
        })
        .catch((error) => {
          if (error.message === "401") {
            setLoadingError("نام کاربری یا رمز عبور اشتباه است");
          }
        });
    },
  });
  return (
    <>
      <span className="text-2xl text-center">ورود به پنل کاربری</span>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-9"
      >
        <div className="flex flex-col gap-2 w-2/3">
          <label htmlFor="username">نام کاربری</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="bg-gray-100 p-3 rounded-md"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500">{formik.errors.username}</div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-2/3">
          <label htmlFor="password">رمز عبور</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="bg-gray-100 p-3 rounded-md"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        {loadingError && <div className="text-red-500">{loadingError}</div>}
        <button
          type="submit"
          className="bg-save text-white w-28 py-4 px-6 rounded-xl"
        >
          ورود
        </button>
      </form>{" "}
    </>
  );
};
