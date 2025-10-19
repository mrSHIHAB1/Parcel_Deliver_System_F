// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { parcelApi } from "../features/parcel/parcelApi"; // ✅ import parcelApi
import { adminApi } from "../features/parcel/adminApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [parcelApi.reducerPath]: parcelApi.reducer, // ✅ add parcelApi reducer
       [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(parcelApi.middleware) // ✅ add parcelApi middleware
       .concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
