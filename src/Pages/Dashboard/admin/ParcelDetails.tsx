import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllParcelsQuery, useUpdateParcelStatusMutation } from "../../../features/parcel/adminApi";
import { toast } from "react-hot-toast";
import { Clock, MapPin, Package, User, Truck, CheckCircle } from "lucide-react";

const ParcelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useGetAllParcelsQuery();
  const [updateStatus, { isLoading: updating }] = useUpdateParcelStatusMutation();

  const parcel = data?.data?.find((p) => p._id === id);

  const [newStatus, setNewStatus] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  if (!parcel)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Parcel not found.
      </div>
    );

  const handleUpdateStatus = async () => {
    try {
      await updateStatus({
        id: parcel._id,
        newStatus,
        location,
        note,
      }).unwrap();

      toast.success("Parcel status updated successfully!");
      setNewStatus("");
      setLocation("");
      setNote("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      {/* Header */}
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

      {/* Parcel Info & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parcel Info */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-3">
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Package className="w-5 h-5" /> Type: {parcel.type}
          </p>
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Truck className="w-5 h-5" /> Weight: {parcel.weight} kg
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
            {parcel.trackingEvents?.map((log: any, index: number) => (
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
                  {log.location && (
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> Location: {log.location}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Update Form */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-500" />
          Update Parcel Status
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Dispatched">Dispatched</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          onClick={handleUpdateStatus}
          disabled={updating}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
};

export default ParcelDetails;
