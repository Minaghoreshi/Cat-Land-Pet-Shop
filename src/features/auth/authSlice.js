import { createSlice } from "@reduxjs/toolkit";
import { login, refresh } from "./authThunk";
const initialState = {
  token: localStorage.getItem("token") || "",
  isLogin: false,
  refreshToken: localStorage.getItem("refreshToken") || "",
  user: null,
  isLoading: false,
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
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
      state.isLoading = false;
      state.token = action.payload.token.accessToken;
      state.refreshToken = action.payload.token.refreshToken;
      state.user = action.payload.data.user;
      localStorage.setItem("token", action.payload.token.accessToken);
      localStorage.setItem("refreshToken", action.payload.token.refreshToken);
    });
    builder.addCase(login.rejected, (state) => {
      state.isLogin = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.refreshToken = action.payload.token.refreshToken;
      localStorage.setItem("refreshToken", action.payload.token.refreshToken);
    });
    builder.addCase(refresh.rejected, (state) => {
      state.token = "";
      state.isLogin = false;
      state.refreshToken = "";
      state.user = null;
      state.isLoading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    });
  },
});

// Action creators are generated for each case reducer function
export const { logOut } = auth.actions;

export default auth.reducer;
