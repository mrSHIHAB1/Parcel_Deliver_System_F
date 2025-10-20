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

      <p className="mt-4 font-semibold">Status Logs:</p>
      <div className="max-h-40 overflow-y-auto border p-2 rounded mb-4">
        {parcel.trackingEvents?.map((log: any, index: number) => (
          <div key={index} className="border-b py-1">
            <p><strong>Status:</strong> {log.status}</p>
            {log.note && <p><strong>Note:</strong> {log.note}</p>}
            {log.location && <p><strong>Location:</strong> {log.location}</p>}
            <p className="text-sm text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
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
          className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default ParcelDetails;
