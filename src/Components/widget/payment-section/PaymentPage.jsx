import React from "react";
import { useDispatch, useSelector } from "react-redux";
import paymentPicture from "../../../assets/payment.jpg";
import { Button } from "flowbite-react";
import { store } from "../../../store";
import Product from "../../../pages/Customer/product/product";
import { addMultipleOrders } from "../../../api/orders/orders-api";
import { clearUserCart } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
export const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalOrders = useSelector((state) => state.user.userCart);
  let totalOrderPrice = 0;

  totalOrders.map((order) => {
    return (totalOrderPrice += Number(order.count) * Number(order.price) * 10);
  });
  const handleSubmit = () => {
    const allOrders = store.getState().user.userCart;
    const userId = store.getState().user.userId;
    const OrdersToAdd = {
      user: userId,
      products: allOrders.map((order) => ({
        product: order._id,
        count: order.count,
      })),
      deliveryStatus: allOrders[0].deliveryDate,
    };
    console.log(OrdersToAdd);
    addMultipleOrders(OrdersToAdd);
    dispatch(clearUserCart());
    navigate("/payment-result", { result: "submitted" });
  };
  const handleCancel = () => {
    navigate("/payment-result", { result: "canceled" });
  };
  // const state = useSelector((state) => state.userPrivateInfo);
  // console.log(state);
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
        <Button onClick={handleSubmit}>پرداخت</Button>
        <Button onClick={handleCancel} className="bg-selected">
          انصراف
        </Button>
      </div>
    </div>
  );
};
