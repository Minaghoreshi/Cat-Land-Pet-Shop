import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAllOrders,
  getUserOldOrdersDetais,
} from "../../../features/user/userThunk";
import { UserOrdersTable } from "../tables";
import { userOrdersColumn } from "./constants";
import { NothingToShow } from "./NothingToShow";
import { store } from "../../../store";
import { Error } from "../error/Error";
export const UserOrderSection = () => {
  const isUserLogin = useSelector((state) => state.user.isLogin);
  const orders = useSelector((state) => state.user.userOrdersId);
  const [tableData, setTableData] = useState([]);
  const userAllDetails = useSelector(
    (state) => state.user.userAllOrdersDetails
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = store.getState().user.userId;

    dispatch(getUserAllOrders(userId));
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      dispatch(getUserOldOrdersDetais(orders));
    }
  }, [dispatch, orders]);

  useEffect(() => {
    if (userAllDetails.length > 0) {
      const formattedTableData = userAllDetails.flatMap((order) =>
        order.products.map((product) => ({
          id: product.product ? product.product._id : "",
          name:
            product.product && product.product.name
              ? product.product.name
              : null,
          thumbnail:
            product.product && product.product.thumbnail
              ? product.product.thumbnail
              : null,
          deliveryStatus: order.deliveryStatus
            ? "تحویل شده"
            : "در انتظار ارسال",
          count: product.count != null ? product.count : null,
        }))
      );

      setTableData(formattedTableData);
    }
  }, [userAllDetails]);
  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  return orders.length > 0 ? (
    <UserOrdersTable data={tableData} column={userOrdersColumn} />
  ) : (
    <NothingToShow />
  );
};
