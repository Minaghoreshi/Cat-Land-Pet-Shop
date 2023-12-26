import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../user/userThunk";

const initialState = {
  firstname: "",
  lastname: "",
  address: "",
  phoneNumber: "",
  userAllOrders: [],

  userId: null,
};
export const userPrivateInfo = createSlice({
  name: "userPrivateInfo",
  initialState,
  reducers: {
    changeUserPrivateInfo: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.address = action.payload.lastname;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.firstname = action.payload.data.user.firstname;
      state.lastname = action.payload.data.user.lastname;
      state.address = action.payload.data.user.address;
      state.phoneNumber = action.payload.data.user.phoneNumber;
      state.userId = action.payload.data.user._id;
    });
  },
});
export const {
  changeUserPrivateInfo,
  incrementAnOrder,
  updateBadge,
  decrementAnOrder,
  addOrder,
  removeAnOrder,
  clearUserCart,
} = userPrivateInfo.actions;
export default userPrivateInfo.reducer;
