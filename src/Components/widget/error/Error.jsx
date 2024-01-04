import React from "react";
import err0r from "../../../assets/error.gif";
export const Error = () => {
  return (
    <div className="flex flex-col  text-[40px] text-primary justify-center items-center pt-10">
      <span>صفحه مورد نظر در دسترس نیست</span>
      <img src={err0r} alt="404" />
    </div>
  );
};
