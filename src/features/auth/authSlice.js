import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { login, refresh } from "./authThunk";

const initialState = {
  token: Cookies.get("token") || "",
  isLogin: Cookies.get("token") ? true : false,
  refreshToken: Cookies.get("refreshToken") || "",
  user: null,
  isLoading: false,
  isAdmin: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.isLogin = false;
      state.refreshToken = "";
      state.user = null;
      state.isLoading = false;
      Cookies.remove("token");
      Cookies.remove("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const userRole = action.payload.data.user.role;
      if (userRole === "ADMIN") {
        state.isLoading = false;
        state.isLogin = true;
        state.token = action.payload.token.accessToken;
        state.refreshToken = action.payload.token.refreshToken;
        state.user = action.payload.data.user;
        state.isAdmin = true;

        Cookies.set("token", action.payload.token.accessToken);
        Cookies.set("refreshToken", action.payload.token.refreshToken);
      } else {
        // Handle the case where the user is not an admin
        state.isLoading = false;
        state.isLogin = false;
        state.token = "";
        state.refreshToken = "";
        state.user = null;
        state.isAdmin = false;
        Cookies.remove("token");
        Cookies.remove("refreshToken");
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.isLogin = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token.accessToken;
      Cookies.set("token", action.payload.token.accessToken);
    });
    builder.addCase(refresh.rejected, (state, action) => {
      console.log(action.payload);
      state.token = "";
      state.isLogin = false;
      state.refreshToken = "";
      state.user = null;
      state.isLoading = false;
      Cookies.remove("token");
      Cookies.remove("refreshToken");
    });
  },
});

export const { logOut } = auth.actions;

export default auth.reducer;
