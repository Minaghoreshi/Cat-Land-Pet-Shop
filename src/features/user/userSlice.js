import { createSlice } from "@reduxjs/toolkit";
import { getUserAllOrders, userLogin } from "./userThunk";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token") || "",
  refreshToken: Cookies.get("refreshToken") || "",
  isLogin: false,
  isLoading: false,
  userAllOrders: [],
  userCart: [],
  badge: 0,
  userId: null,
};
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserCart: (state) => {
      state.userCart = [];
    },

    updateBadge: (state) => {
      state.badge = state.userCart.length;
    },
    addOrder: (state, action) => {
      const newOrder = action.payload;

      const existingOrderIndex = state.userCart.findIndex(
        (order) => order._id === newOrder._id
      );

      if (existingOrderIndex !== -1) {
        // Product already exists, update its count
        state.userCart[existingOrderIndex].count = newOrder.count;
      } else {
        // Product doesn't exist, add a new order
        state.userCart.push(newOrder);
      }
    },
    removeAnOrder: (state, action) => {
      const orderToRemoveId = action.payload;
      state.userCart = state.userCart.filter(
        (order) => order._id !== orderToRemoveId
      );
    },
    incrementAnOrder: (state, action) => {
      const selectedProduct = action.payload._id;
      const orderToUpdate = state.userCart.find(
        (order) => order._id === selectedProduct
      );
      orderToUpdate.count += 1;
    },
    decrementAnOrder: (state, action) => {
      const selectedProduct = action.payload._id;
      const orderToUpdate = state.userCart.find(
        (order) => order._id === selectedProduct
      );
      orderToUpdate.count -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log("hi");
      console.log(action.payload.token.refreshToken);
      state.token = action.payload.token.accessToken;
      state.refreshToken = action.payload.token.refreshToken;
      state.isLogin = true;
      state.userId = action.payload.data.user._id;
      state.isLoading = false;
      Cookies.set("token", action.payload.token.accessToken);
      Cookies.set("refreshToken", action.payload.token.refreshToken);
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isLogin = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAllOrders.fulfilled, (state, action) => {
      state.userAllOrders = action.payload;
    });
  },
});
export const {
  incrementAnOrder,
  updateBadge,
  decrementAnOrder,
  addOrder,
  removeAnOrder,
  clearUserCart,
  custom,
} = user.actions;
export default user.reducer;
