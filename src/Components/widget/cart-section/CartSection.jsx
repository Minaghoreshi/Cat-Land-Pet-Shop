import React from "react";
import { TableTitle } from "../tables/TableTitle";
import { CartTable } from "../tables";
import { cartTableColumn } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { clearUserCart } from "../../../features/user/userSlice";
export const CartSection = () => {
  // const state = store.getState();
  const dispatch = useDispatch();
  const handleClearUserCart = () => {
    dispatch(clearUserCart());
  };
  const tableData = useSelector((state) => state.user.userCart);
  return (
    <div className="mt-5 flex  w-3/4 flex-col ">
      <TableTitle title={"سبد خرید"} />
      <CartTable column={cartTableColumn} data={tableData} />
      <button onClick={handleClearUserCart}>clear</button>
    </div>
  );
};
