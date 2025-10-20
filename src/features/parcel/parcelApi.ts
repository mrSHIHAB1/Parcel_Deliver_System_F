import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import type { Parcel } from "./apiTypes";


export const parcelApi = createApi({
  reducerPath: "parcelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/parcel",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", token); 
      }
      return headers;
    },
  }),
  tagTypes: ["Parcel"],
  endpoints: (builder) => ({
    createParcel: builder.mutation<any, Partial<any>>({
      query: (parcel) => {
        const body = { ...parcel };
        if (!body.couponCode) delete body.couponCode;
        return {
          url: "/createParcel",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Parcel"],
    }),
    cancelParcel: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/cancelParcel/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Parcel"],
    }),
    getParcels: builder.query<Parcel[], void>({
      query: () => "/getParcel",
      providesTags: ["Parcel"],
    }),

    getReceiverParcels: builder.query<{ data: Parcel[] }, void>({
      query: () => "/reciverParcels",
      providesTags: ["Parcel"],
    }),

    confirmReceiverParcel: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/reciverConfirm/${id}`,
        method: "PATCH",
        body: { reciverConfiramtion: "Confirmed" },
      }),
      invalidatesTags: ["Parcel"],
    }),

    getReceiverHistory: builder.query<{ data: Parcel[] }, void>({
      query: () => "/getreciverhistory",
      providesTags: ["Parcel"],
    }),
      getTrackingEvents: builder.query<any, string>({
      query: (trackingId) => `/tracking-events/${trackingId}`,
      providesTags: ["Parcel"],
    }),
  }),
});

export const { useCreateParcelMutation, 
  useCancelParcelMutation, 
  useGetParcelsQuery,  
  useGetReceiverParcelsQuery ,
  useGetReceiverHistoryQuery,
  useConfirmReceiverParcelMutation  , 
  useGetTrackingEventsQuery,} = parcelApi;
