import React from "react";
import { useLocation } from "react-router-dom";
import success from "../../../assets/success.png";
import unsuccess from "../../../assets/unsuccess.png";
export const PaymentResult = () => {
  const location = useLocation();
  const result = location.state && location.state.result;

  return result === "success" ? (
    <div className="flex flex-col w-full px-32 text-4xl ">
      <span>نتیجه پرداخت</span>
      <div className="text-center flex items-center justify-center gap-8 text-save text-xl">
        {" "}
        <img className="w-52 h-52" src={success} alt="successfull" />
        <span>
          پرداخت موفقیت آمیز بود
          <br />
          سفارش شما ثبت گردید و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full px-32 text-4xl ">
      <span>نتیجه پرداخت</span>
      <div className="text-center flex items-center justify-center gap-8 text-selected text-xl">
        <img className="w-52 h-52" src={unsuccess} alt="successfull" />
        <span>
          پرداخت موفقیت آمیز نبود
          <br />
          <br />
          سفارش شما در انتظار پرداخت است{" "}
        </span>
      </div>
    </div>
  );
};
