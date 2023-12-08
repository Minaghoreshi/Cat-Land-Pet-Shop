import React from "react";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./loginSchema";
import { useFormik } from "formik";
export const LoginForm = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Your form submission logic here
      // For now, let's just navigate to "/products-table"
      navigate("/products-table");
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
          <label htmlFor="name">نام کاربری</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="bg-gray-100 p-3 rounded-md"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500">{formik.errors.name}</div>
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
