import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllParcelsQuery } from "../../../features/parcel/adminApi";

const AdminParcels = () => {
  const { data, isLoading } = useGetAllParcelsQuery();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading parcels...</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data?.data?.map((parcel) => (
        <div
          key={parcel._id}
          className="border p-4 rounded shadow cursor-pointer hover:shadow-lg"
          onClick={() => navigate(`/admin/parcels/${parcel._id}`)}
        >
          <h3 className="font-semibold text-lg">{parcel.trackingId}</h3>
          <p>Sender: {parcel.sender}</p>
          <p>Status: {parcel.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminParcels;
