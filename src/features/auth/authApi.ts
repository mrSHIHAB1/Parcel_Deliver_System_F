// src/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://parcelbackend-kappa.vercel.app/api/v1" }), // change to your backend URL
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; role: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<{ message: string }, { email: string; password: string; role: string }>({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// 👇 export hooks
export const { useLoginMutation, useRegisterMutation } = authApi;
