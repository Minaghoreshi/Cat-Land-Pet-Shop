import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAllOrders,
  getUserOldOrdersDetais,
} from "../../../features/user/userThunk";

export const UserOrderSection = () => {
  const isUserLogin = useSelector((state) => state.user.isLogin);
  const orders = useSelector((state) => state.user.userAllOrders);
  const userId = useSelector((state) => state.user.userId);
  const userAllDetails = useSelector(
    (state) => state.user.userAllOrdersDetails
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAllOrders(userId));
    dispatch(getUserOldOrdersDetais(orders));
  }, [userId, dispatch, orders]);
  console.log(orders);
  console.log(userAllDetails);
  // console.log(isUserLogin, userId);
  return isUserLogin ? <div>userordersTable</div> : <div>please sign in</div>;
};
