import { createSlice } from "@reduxjs/toolkit";
import { login, refresh } from "./authThunk";
const initialState = {
  token: "",
  isLogin: false,
  refreshToken: "",
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLogin = true;
      state.isLoading = false;
      state.token = action.payload.token.accessToken;
      state.refreshToken = action.payload.token.refreshToken;
      state.user = action.payload.data.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLogin = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.token = action.payload.token.refreshToken;
    });
    builder.addCase(refresh.rejected, (state) => {
      state.token = "";
      state.isLogin = false;
      state.refreshToken = "";
      state.user = null;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { logOut } = auth.actions;

export default auth.reducer;
