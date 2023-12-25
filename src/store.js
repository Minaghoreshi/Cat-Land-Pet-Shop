import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./features/rootReducers";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// export const store = configureStore({
//   reducer: rootReducers,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Specify the slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
