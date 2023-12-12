import { logOut } from "../features/auth/authSlice";
import { refresh } from "../features/auth/authThunk";
import { store } from "../store";
import axios from "axios";
const URL = `http://localhost:8000/api/auth/login`;

const api = axios.create({ baseURL: URL });
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.token;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refresh(refreshToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.token.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logOut());
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);
export default api;
