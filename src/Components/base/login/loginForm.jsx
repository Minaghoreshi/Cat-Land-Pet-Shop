import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./loginSchema";
import { useFormik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/authThunk";

export const LoginForm = ({ shouldNavigate = true }) => {
  const [loadingError, setLoadingError] = useState(null);
  let navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      //   dispatch(login(values))
      //     .unwrap()
      //     .then((action) => {
      //       console.log(action);
      //       const isAdmin = action.data.user.role;
      //       console.log(isAdmin);
      //       if (isAdmin !== "ADMIN") {
      //         setLoadingError("نام کاربری یا رمز عبور اشتباه است");
      //       }
      //       if (shouldNavigate && isAdmin) {
      //         navigate("/products-table");
      //       }
      //     })
      //     .catch((error) => {
      //       if (error.message === "401" || !isLogin) {
      //         setLoadingError("نام کاربری یا رمز عبور اشتباه است");
      //       }
      //     });
      // },onSubmit: (values) => {
      dispatch(login(values))
        .then((action) => {
          const isAdmin = action.payload.data.user.role;
          if (isAdmin === "ADMIN") {
            // Reset any previous error
            setLoadingError("");
            // Navigate if needed
            if (shouldNavigate) {
              navigate("/products-table");
            }
          } else {
            setLoadingError("نام کاربری یا رمز عبور اشتباه است");
          }
        })
        .catch((error) => {
          if (error.message === "401" || !isLogin) {
            setLoadingError("نام کاربری یا رمز عبور اشتباه است");
          }
        });
    },
  });

  return (
    <div className="text-primary w-1/4 rounded-2xl text-lg p-11 shadow-2xl flex flex-col gap-16">
      <span className="text-2xl text-center">ورود به پنل مدیریت کت لند</span>
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
        <span
          onClick={() => {
            navigate("/");
          }}
          href="/"
          className="text-primary cursor-pointer"
        >
          بازگشت به سایت
        </span>
      </form>
    </div>
  );
};
