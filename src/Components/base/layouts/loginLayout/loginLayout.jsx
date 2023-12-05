import React from "react";
import { Container } from "../container";
import { useNavigate } from "react-router-dom";

export function LoginLayout() {
  let navigate = useNavigate();
  return (
    <Container className="flex justify-center items-center">
      <div className="text-primary w-1/4 rounded-2xl text-lg p-11 shadow-2xl flex flex-col gap-16">
        <span className="text-2xl text-center">ورود به پنل مدیریت کت لند</span>
        <form action="" className="flex flex-col items-center gap-9">
          <div className="flex flex-col gap-2 w-2/3">
            <label htmlFor="name">نام کاربری</label>
            <input
              type="text"
              name="name"
              className="bg-gray-100 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 w-2/3">
            <label htmlFor="password">رمز عبور</label>
            <input
              type="password"
              name="password"
              className="bg-gray-100 p-3 rounded-md"
            />
          </div>
          <button
            onClick={() => {
              navigate("/products-table");
            }}
            type="submit"
            className="bg-save text-white w-28 py-4 px-6 rounded-xl"
          >
            ورود
          </button>
          <a href="/" className="text-primary flex">
            بازگشت به سایت
          </a>
        </form>
      </div>
    </Container>
  );
}
