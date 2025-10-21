import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllParcelsQuery, useUpdateParcelStatusMutation } from "../../../features/parcel/adminApi";

const ParcelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useGetAllParcelsQuery();
  const [updateStatus] = useUpdateParcelStatusMutation();

  const parcel = data?.data?.find((p) => p._id === id);

  const [newStatus, setNewStatus] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  if (!parcel) return <p className="p-4">Parcel not found.</p>;

  const handleUpdateStatus = async () => {
    try {
      await updateStatus({
        id: parcel._id,
        newStatus,
        location,
        note,
      }).unwrap();

      alert("Parcel status updated successfully!");
      setNewStatus("");
      setLocation("");
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{parcel.trackingId}</h2>
      <p><strong>Sender:</strong> {parcel.sender}</p>
      <p><strong>Receiver:</strong> {parcel.receiver}</p>
      <p><strong>Type:</strong> {parcel.type}</p>
      <p><strong>Weight:</strong> {parcel.weight} kg</p>
      <p><strong>Status:</strong> {parcel.status}</p>
      <p><strong>From:</strong> {parcel.fromAddress}</p>
      <p><strong>To:</strong> {parcel.toAddress}</p>

      <p className="mt-6 font-semibold mb-2">Status Timeline:</p>
      <div className="relative border-l-2 border-gray-300 ml-4">
        {parcel.trackingEvents?.map((log: any, index: number) => (
          <div key={index} className="mb-6 ml-6 relative">
          
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
         
            <div className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{log.status}</p>
              {log.note && <p><strong>Note:</strong> {log.note}</p>}
              {log.location && <p className="text-gray-500 text-sm">Location: {log.location}</p>}
              <p className="text-gray-400 text-sm">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex flex-col gap-2 mt-6">
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border px-2 py-1 rounded"
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
          className="border px-2 py-1 rounded"
        />

        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <button
          onClick={handleUpdateStatus}
          className="bg-blue-600 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default ParcelDetails;
