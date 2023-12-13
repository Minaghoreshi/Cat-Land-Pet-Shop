import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const userAPI = `http://localhost:8000/api/auth/login`;
const refreshAPI = `http://localhost:8000/api/auth/token`;
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
    const response = await axios.post(refreshAPI, data);
    return response;
  } catch (error) {
    throw error.response.massage;
  }
});