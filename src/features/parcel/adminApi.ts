import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
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
    // 1️⃣ View all users
    getAllUsers: builder.query<any[], void>({
      query: () => "/user/all-users",
      providesTags: ["User"],
    }),

    // 2️⃣ View all parcels
    getAllParcels: builder.query<any[], void>({
      query: () => "/parcel/allparcel",
      providesTags: ["Parcel"],
    }),

    // 3️⃣ Block/Unblock user
updateUserStatus: builder.mutation<any, { id: string; isblocked: boolean }>({
  query: ({ id, isblocked }) => ({
    url: `/user/updateUsers/${id}`,
    method: "PATCH",
    body: { isblocked }, // ✅ lowercase
  }),
  invalidatesTags: ["User"],
}),


    // 4️⃣ Block/Unblock parcel
    updateParcelBlock: builder.mutation<any, { id: string; isBlocked: boolean }>({
      query: ({ id, isBlocked }) => ({
        url: `/parcel/updateParcel/${id}`,
        method: "POST",
        body: { isBlocked },
      }),
      invalidatesTags: ["Parcel"],
    }),

    // 5️⃣ Update delivery status
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
