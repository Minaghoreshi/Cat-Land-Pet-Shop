import React, { useState } from "react";
import { singUpValidationSchema } from "./signUpSchema";
import { useFormik } from "formik";
import { addNewUser } from "../../../../../api/users/users-api";
export const SignUpForm = ({ handleChangeToSignUp, setToastifyVisible }) => {
  const [loadingError, setLoadingError] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: singUpValidationSchema,
    onSubmit: async (values) => {
      const userDataToSend = {
        firstname: formik.values.firstname,
        lastname: formik.values.lastname,
        username: formik.values.username,
        password: formik.values.password,
        phoneNumber: formik.values.phoneNumber,
        address: formik.values.address,
        role: "USER",
      };
      const res = await addNewUser(userDataToSend);
      console.log(res);
      if (res === 201) {
        setLoadingError((prev) => null);
        setToastifyVisible((prev) => !prev);
        setTimeout(() => {
          handleChangeToSignUp();
        }, 3200);
      } else {
        const responseBody = await res.response.data;
        const errorMatch = responseBody.match(/Error: (.+)<br>/);
        if (errorMatch && errorMatch.length > 1) {
          const errorMessage = errorMatch[1].split(".")[0];
          if (errorMessage === "username is already taken") {
            setLoadingError("نام کاربری تکراری است");
          } else if (errorMessage === "phoneNumber is already exists") {
            setLoadingError(" شماره همراه قبلا استفاده شده است");
          }
        }
      }
    },
  });

  return (
    <>
      <span className="text-2xl text-center">ثبت نام</span>{" "}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-6 px-9 text-base text-gray-700"
      >
        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="username">نام </label>
            <input
              type="text"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              className="bg-gray-100 p-3 rounded-md"
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="text-red-500">{formik.errors.firstname}</div>
            )}
          </div>{" "}
          <div className="flex flex-col gap-2 ">
            <label htmlFor="username">نام خانوادگی </label>
            <input
              type="text"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              className="bg-gray-100 p-3 rounded-md"
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="text-red-500">{formik.errors.lastname}</div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between gap-2">
          {" "}
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2 ">
            <label htmlFor="username">شماره همراه </label>
            <input
              type="text"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              className="bg-gray-100 p-3 rounded-md"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500">{formik.errors.phoneNumber}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="username">آدرس </label>
          <textarea
            type="text"
            name="address"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="bg-gray-100 p-3 rounded-md resize-none"
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500">{formik.errors.address}</div>
          )}
        </div>
        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col gap-2 ">
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
          <div className="flex flex-col gap-2 ">
            <label htmlFor="confirmPassword">تأیید رمز عبور</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="bg-gray-100 p-3 rounded-md"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>{" "}
        {loadingError && <div className="text-red-500">{loadingError}</div>}
        <button
          type="submit"
          className="bg-save text-white w-28 py-4 px-6 rounded-xl"
        >
          ثبت نام
        </button>
      </form>{" "}
    </>
  );
};
