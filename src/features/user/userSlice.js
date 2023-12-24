import { createSlice } from "@reduxjs/toolkit";
import { getUserAllOrders, userLogin } from "./userThunk";

const initialState = {
  isLogin: false,
  userId: null,
  isLoading: false,
  userAllOrders: [],
  userCart: [],
  badge: 0,
};
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
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
      state.productsCount = state.userCart.length;
    },
    removeAnOrder: (state, action) => {
      const orderToRemoveId = action.payload._id;
      state.userCart.filter((order) => order._id !== orderToRemoveId);
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
      state.isLoading = true;
      state.userId = action.payload.data.user._id;
      state.isLoading = false;
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
export const { incrementAnOrder, decrementAnOrder, addOrder, removeAnOrder } =
  user.actions;
export default user.reducer;
