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
