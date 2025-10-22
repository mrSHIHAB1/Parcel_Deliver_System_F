// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { parcelApi } from "../features/parcel/parcelApi"; 
import { adminApi } from "../features/parcel/adminApi";
import { errorMiddleware } from "../GlobalErrorHandler/errorMiddleware";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [parcelApi.reducerPath]: parcelApi.reducer, 
       [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(parcelApi.middleware) 
       .concat(adminApi.middleware)
       .concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
