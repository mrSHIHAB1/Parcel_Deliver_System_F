import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetParcelsQuery, useCancelParcelMutation } from "../../../features/parcel/parcelApi";
import { toast } from "react-hot-toast";
import { Clock, MapPin, Package, User } from "lucide-react"; // icons for style

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

  if (!parcel)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Parcel not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      {/* Parcel Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{parcel.trackingId}</h2>
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4" /> Sender: {parcel.sender}
          </p>
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4" /> Receiver: {parcel.receiver}
          </p>
        </div>
        <span
          className={`mt-4 md:mt-0 inline-block px-4 py-2 rounded-full text-white font-semibold ${
            parcel.status === "Delivered"
              ? "bg-green-500"
              : parcel.status === "In Transit"
              ? "bg-yellow-500"
              : parcel.status === "Cancelled"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {parcel.status}
        </span>
      </div>

      {/* Parcel Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-3">
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Package className="w-5 h-5" /> Type: {parcel.type}
          </p>
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Package className="w-5 h-5" /> Weight: {parcel.weight} kg
          </p>
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Clock className="w-5 h-5" /> Fee: ${parcel.fee}
          </p>
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MapPin className="w-5 h-5" /> From: {parcel.fromAddress}
          </p>
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MapPin className="w-5 h-5" /> To: {parcel.toAddress}
          </p>
        </div>

        {/* Status Timeline */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Status Timeline</h3>
          <div className="relative border-l-2 border-gray-200 dark:border-gray-600 ml-4">
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
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-800 dark:text-white">{log.status}</p>
                  {log.note && <p className="text-gray-700 dark:text-gray-300"><strong>Note:</strong> {log.note}</p>}
                  {log.location && <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="w-4 h-4"/> Location: {log.location}</p>}
                  <p className="text-gray-400 text-xs">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {parcel.status !== "Dispatched" && parcel.status !== "Cancelled" && (
        <button
          onClick={handleCancel}
          disabled={canceling}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          {canceling ? "Cancelling..." : "Cancel Parcel"}
        </button>
      )}
    </div>
  );
}
