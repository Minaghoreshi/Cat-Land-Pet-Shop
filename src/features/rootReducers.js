import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
const rootReducers = combineReducers({ auth: authReducer, user: userReducer });
export default rootReducers;
