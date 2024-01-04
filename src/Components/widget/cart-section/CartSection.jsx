import React from "react";
import { TableTitle, CartTable } from "../tables";
import { cartTableColumn } from "./constants";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { store } from "../../../store";
import { useNavigate } from "react-router-dom";
export const CartSection = () => {
  let totalOrderPrice = 0;
  const navigate = useNavigate();
  const tableData = useSelector((state) => state.user.userCart);

  tableData.map((order) => {
    return (totalOrderPrice += Number(order.count) * Number(order.price));
  });

  const handleSubmit = () => {
    const isLogin = store.getState().user.isLogin;
    if (isLogin) {
      console.log(isLogin);
      navigate("/checkout");
    } else {
      navigate("/user-login");
    }
  };

  return (
    <div className="mt-5 flex  w-3/5 flex-col gap-10">
      <TableTitle title={"سبد خرید"} />
      {tableData.length > 0 ? (
        <>
          <CartTable column={cartTableColumn} data={tableData} />{" "}
          <div className="flex justify-between">
            <span className="text-save">{`مبلغ کل: ${totalOrderPrice.toLocaleString(
              "en-US"
            )} تومان`}</span>
            <Button onClick={handleSubmit}>نهایی کردن سبد خرید</Button>
          </div>
        </>
      ) : (
        <span className="text-[30px] text-selected">سبد خرید شما خالی است</span>
      )}
    </div>
  );
};
