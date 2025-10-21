import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetParcelsQuery, useCancelParcelMutation } from "../../../features/parcel/parcelApi";
import { toast } from "react-hot-toast";

export default function SenderParcelDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data } = useGetParcelsQuery();
  const parcels = data?.data || [];
  const parcel = parcels.find((p) => p.id === id);

  const [cancelParcel, { isLoading: canceling }] = useCancelParcelMutation();

  const handleCancel = async () => {
    if (!parcel) return;
    try {
      await cancelParcel({ id: parcel.id, status: "Cancelled" }).unwrap();
      toast.success("Parcel cancelled successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel parcel");
    }
  };

  if (!parcel) return <p className="p-4">Parcel not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{parcel.trackingId}</h2>

      <div className="space-y-2">
        <p><strong>Sender:</strong> {parcel.sender}</p>
        <p><strong>Receiver:</strong> {parcel.receiver}</p>
        <p><strong>Type:</strong> {parcel.type}</p>
        <p><strong>Weight:</strong> {parcel.weight} kg</p>
        <p><strong>Status:</strong> {parcel.status}</p>
        <p><strong>Fee:</strong> {parcel.fee}</p>
        <p><strong>From:</strong> {parcel.fromAddress}</p>
        <p><strong>To:</strong> {parcel.toAddress}</p>
      </div>

      {/* ---------------- Timeline ---------------- */}
      <h3 className="mt-6 font-semibold text-lg">Status Timeline</h3>
      <div className="relative border-l-2 border-gray-300 ml-4">
        {parcel.status_logs?.map((log: any, index: number) => (
          <div key={index} className="mb-6 ml-6 relative">
            {/* Circle */}
            <span
              className={`absolute -left-11 top-0 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
                ${log.status === "Delivered"
                  ? "bg-green-500"
                  : log.status === "In Transit"
                  ? "bg-yellow-500"
                  : log.status === "Cancelled"
                  ? "bg-red-500"
                  : "bg-blue-500"
                }`}
            >
              {index + 1}
            </span>
            {/* Event card */}
            <div className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{log.status}</p>
              {log.note && <p><strong>Note:</strong> {log.note}</p>}
              {log.location && <p className="text-gray-500 text-sm">Location: {log.location}</p>}
              <p className="text-gray-400 text-sm">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel button if not dispatched/cancelled */}
      {parcel.status !== "Dispatched" && parcel.status !== "Cancelled" && (
        <button
          onClick={handleCancel}
          disabled={canceling}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {canceling ? "Cancelling..." : "Cancel Parcel"}
        </button>
      )}
    </div>
  );
}
