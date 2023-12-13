import { logOut } from "../features/auth/authSlice";
import { refresh } from "../features/auth/authThunk";
import { store } from "../store";
import axios from "axios";
const URL = `http://localhost:8000/api/token`;

const api = axios.create({ baseURL: URL });
api.interceptors.request.use(
  (config) => {
    // const state = store.getState();
    // const accessToken = state.auth.token;const
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      // console.log("accesstoken");
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
    // const state = store.getState();
    // const generatedRefreshToken = state.auth.refreshToken;
    const generatedRefreshToken = localStorage.getItem("refreshToken");
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(originalRequest);
      try {
        const response = await refresh(
          JSON.stringify({ refreshToken: generatedRefreshToken })
        );
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.token.accessToken}`;
        console.log(originalRequest);
        return axios(originalRequest);
      } catch (refreshError) {
        store.dispatch(logOut());
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";
// import { store } from "../store";
// import { refresh } from "../features/auth/authThunk";
// import { logOut } from "../features/auth/authSlice";
// const api = axios.create({
//   baseURL: "http://localhost:8000/api/auth/token",
//   timeout: 5000,
// });
// const accessToken = localStorage.getItem("token");

// api.interceptors.request.use(
//   function (config) {
//     const state = store.getState();
//     const { token, isLogin } = state.auth;
//     if (isLogin) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // status 401
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     // const state = store.getState();
//     // const accessToken = state.auth.accessToken;
//     if (error.response.status === 401 || error.response.status === 403) {
//       const originalRequest = error.config;
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         store
//           .dispatch(refresh({ accessToken }))
//           .unwrap()
//           .then((data) => {
//             originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
//             return api(originalRequest);
//           })
//           .catch(() => store.dispatch(logOut()));
//       } else {
//         store.dispatch(logOut());
//       }
//     }
//     return Promise.reject(error);
//   }
// );
// export default api;
