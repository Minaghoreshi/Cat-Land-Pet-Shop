import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAllOrders,
  getUserOldOrdersDetais,
} from "../../../features/user/userThunk";
import { UserOrdersTable } from "../tables";
import { userOrdersColumn } from "./constants";
import { NothingToShow } from "./NothingToShow";

export const UserOrderSection = () => {
  const isUserLogin = useSelector((state) => state.user.isLogin);
  const orders = useSelector((state) => state.user.userOrdersId);
  const userId = useSelector((state) => state.user.userId);
  const [tableData, setTableData] = useState([]);
  const userAllDetails = useSelector(
    (state) => state.user.userAllOrdersDetails
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAllOrders(userId));
    dispatch(getUserOldOrdersDetais(orders));
  }, [userId]);

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

  return isUserLogin ? (
    <UserOrdersTable data={tableData} column={userOrdersColumn} />
  ) : (
    <NothingToShow />
  );
};
