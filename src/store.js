import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./features/rootReducers";
import logger from "redux-logger";
export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
