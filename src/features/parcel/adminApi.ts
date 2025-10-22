import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import type { GetAllParcelsResponse, GetAllUsersResponse } from "./apiTypes";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://parcelbackend-kappa.vercel.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Parcel"],
  endpoints: (builder) => ({
  
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => "/user/all-users",
      providesTags: ["User"],
    }),

 
    getAllParcels: builder.query<GetAllParcelsResponse, void>({
      query: () => "/parcel/allparcel",
      providesTags: ["Parcel"],
    }),
    

   
updateUserStatus: builder.mutation<any, { id: string; isblocked: boolean }>({
  query: ({ id, isblocked }) => ({
    url: `/user/updateUsers/${id}`,
    method: "PATCH",
    body: { isblocked }, 
  }),
  invalidatesTags: ["User"],
}),


    updateParcelBlock: builder.mutation<any, { id: string; isBlocked: boolean }>({
      query: ({ id, isBlocked }) => ({
        url: `/parcel/updateParcel/${id}`,
        method: "POST",
        body: { isBlocked },
      }),
      invalidatesTags: ["Parcel"],
    }),

  
    updateParcelStatus: builder.mutation({
      query: ({ id, newStatus, location, note }) => ({
        url: `parcel/update-status/${id}`,
        method: "PATCH",
        body: { newStatus, location, note },
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllParcelsQuery,
  useUpdateUserStatusMutation,
  useUpdateParcelBlockMutation,
  useUpdateParcelStatusMutation,
} = adminApi;
