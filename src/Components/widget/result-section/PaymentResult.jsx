import React, { useEffect, useState } from "react";
import success from "../../../assets/success.png";
import unsuccess from "../../../assets/unsuccess.png";
import { addMultipleOrders } from "../../../api/orders/orders-api";
import { store } from "../../../store";
import { clearUserCart, updateBadge } from "../../../features/user/userSlice";
export const PaymentResult = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const result = urlSearchParams.get("result");
  const [pageResult, setPageResult] = useState(null);
  useEffect(() => {
    setPageResult(result);
  }, []);
  useEffect(() => {
    const handleResult = async () => {
      if (pageResult === "success") {
        const allOrders = store.getState().user.userCart;
        const userId = store.getState().user.userId;
        console.log(allOrders[0].deliveryDate);
        const ordersToAdd = {
          user: userId,
          products: allOrders.map((order) => ({
            product: order._id,
            count: order.count,
          })),
          deliveryStatus: false,
          deliveryDate: allOrders[0].deliveryDate,
        };

        try {
          await addMultipleOrders(ordersToAdd);
          store.dispatch(clearUserCart());
          store.dispatch(updateBadge());
        } catch (error) {
          console.error("Error adding orders:", error);
        }
      }
    };

    handleResult();
  }, [pageResult]);

  console.log(result);
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
