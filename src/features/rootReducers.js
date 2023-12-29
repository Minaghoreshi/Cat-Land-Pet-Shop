import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import userPrivate from "./users-private-info/privateSlice";
const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  userPrivateInfo: userPrivate,
});
export default rootReducers;
