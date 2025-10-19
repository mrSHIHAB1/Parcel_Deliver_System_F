import React, { useState } from "react";
import { useGetAllParcelsQuery, useUpdateParcelStatusMutation } from "../../../features/parcel/adminApi";

const AdminParcels = () => {
  const { data: parcels = [], isLoading } = useGetAllParcelsQuery();
  const [updateStatus] = useUpdateParcelStatusMutation();

  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [note, setNote] = useState<string>("");

  if (isLoading) return <p>Loading parcels...</p>;

  const handleUpdateStatus = async () => {
    if (!selectedParcel) return;

    try {
      await updateStatus({
        id: selectedParcel._id,
        newStatus,
        location,
        note,
      }).unwrap();

      alert("Parcel status updated successfully!");
      setSelectedParcel(null);
      setNewStatus("");
      setLocation("");
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {parcels.data?.map((parcel) => (
        <div
          key={parcel._id}
          className="border p-4 rounded shadow cursor-pointer hover:shadow-lg"
          onClick={() => setSelectedParcel(parcel)}
        >
          <h3 className="font-semibold text-lg">{parcel.trackingId}</h3>
          <p>Sender: {parcel.sender}</p>
          <p>Status: {parcel.status}</p>
        </div>
      ))}

      {/* Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedParcel(null)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">{selectedParcel.trackingId}</h2>
            <p><strong>Sender:</strong> {selectedParcel.sender}</p>
            <p><strong>Receiver:</strong> {selectedParcel.receiver}</p>
            <p><strong>Type:</strong> {selectedParcel.type}</p>
            <p><strong>Weight:</strong> {selectedParcel.weight} kg</p>
            <p><strong>Status:</strong> {selectedParcel.status}</p>
            <p><strong>From:</strong> {selectedParcel.fromAddress}</p>
            <p><strong>To:</strong> {selectedParcel.toAddress}</p>
            <p className="mt-4 font-semibold">Status Logs:</p>
            <div className="max-h-40 overflow-y-auto border p-2 rounded mb-4">
              {selectedParcel.trackingEvents?.map((log: any, index: number) => (
                <div key={index} className="border-b py-1">
                  <p><strong>Status:</strong> {log.status}</p>
                  {log.note && <p><strong>Note:</strong> {log.note}</p>}
                  {log.location && <p><strong>Location:</strong> {log.location}</p>}
                  <p className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
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
        </div>
      )}
    </div>
  );
};

export default AdminParcels;
