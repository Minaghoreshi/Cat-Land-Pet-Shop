import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store";
import { refresh } from "../features/auth/authThunk";
const URL = "http://localhost:8000/api/token";
const api = axios.create({ baseURL: URL });

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
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
    const generatedRefreshToken = Cookies.get("refreshToken");
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const data = await store
          .dispatch(refresh(generatedRefreshToken))
          .unwrap();
        Cookies.set("token", data.token.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.token.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh error or dispatch logout if necessary
        // store.dispatch(logOut());
        // throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
