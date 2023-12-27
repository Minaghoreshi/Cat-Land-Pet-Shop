import React from "react";
import { useDispatch, useSelector } from "react-redux";
import paymentPicture from "../../../assets/payment.jpg";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { handleCancel, handleSubmit } from "./utils";
export const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalOrders = useSelector((state) => state.user.userCart);
  let totalOrderPrice = 0;
  totalOrders.map((order) => {
    return (totalOrderPrice += Number(order.count) * Number(order.price) * 10);
  });

  return (
    <div>
      <div className="relative">
        {" "}
        <span className="absolute top-[14.2rem] right-[15.4rem] text-white bg-[#5c5c5c] text-lg w-[242px] ">{` ${totalOrderPrice.toLocaleString(
          "en-US"
        )} : ریال  `}</span>
        <img className="w-[900px]" src={paymentPicture} alt="payment" />
      </div>
      <div className="flex gap-7 justify-center mt-5">
        <Button
          onClick={() => {
            handleSubmit(dispatch, navigate);
          }}
        >
          پرداخت
        </Button>
        <Button
          onClick={() => {
            handleCancel(navigate);
          }}
          className="bg-selected"
        >
          انصراف
        </Button>
      </div>
    </div>
  );
};
