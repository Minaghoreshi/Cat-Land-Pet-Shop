import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const userAPI = `http://localhost:8000/api/auth/login`;
const ordersApi = `http://localhost:8000/api/orders`;
//data:username,password :string
export const userLogin = createAsyncThunk(`userLogin`, async (data) => {
  try {
    const response = await axios.post(userAPI, data);

    return response.data;
  } catch (error) {
    throw error.response.status;
  }
});
//userId:unique id of userData
export const getUserAllOrders = createAsyncThunk(
  "getUserAllOrders",
  async (userId) => {
    try {
      const response = await axios.get(ordersApi, { params: { user: userId } });
      return response.data.data.orders;
    } catch (error) {
      console.log(error);
    }
  }
);
//userOrdersId is from the redux state, an array of Ids.
export const getUserOldOrdersDetais = createAsyncThunk(
  "userOrdersDetails",
  async (userOrdersIds) => {
    const orderDetailsPromises = userOrdersIds.map(async (id) => {
      const response = await axios.get(
        `http://localhost:8000/api/orders/${id}`
      );
      return response.data.data.order;
    });
    try {
      const ordersDetails = await Promise.all(orderDetailsPromises);
      return ordersDetails;
    } catch (error) {
      console.log(error);
    }
  }
);
