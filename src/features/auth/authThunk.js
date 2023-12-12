import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const userAPI = `http://localhost:8000/api/auth/login`;
//data= username:string password:string
export const login = createAsyncThunk(`auth/userLogin`, async (data) => {
  try {
    const response = await axios.post(userAPI, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.status;
  }
});
//data= refreshToken:string
export const refresh = createAsyncThunk(`auth/refresh-token`, async (data) => {
  try {
    const response = await axios.post(userAPI, data);
    return response.data;
  } catch (error) {
    throw error.response.massage;
  }
});
