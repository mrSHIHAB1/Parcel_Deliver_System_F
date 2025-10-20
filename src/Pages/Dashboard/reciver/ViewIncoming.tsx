import React from "react";
import { useGetReceiverParcelsQuery } from "../../../features/parcel/parcelApi";
import { useNavigate } from "react-router-dom";

const ViewIncoming = () => {
  const { data, isLoading, isError } = useGetReceiverParcelsQuery();
  const navigate = useNavigate();

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading incoming parcels...</p>;
  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;
  if (!data || data.data.length === 0)
    return <p className="text-center mt-10 text-gray-600">No incoming parcels found.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">📦 Incoming Parcels</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">#</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Sender</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Parcel Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((parcel: any, index: number) => (
              <tr
                key={parcel._id}
                onClick={() => navigate(`/receiver/parcels/${parcel._id}`)}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{parcel.senderName}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{parcel.parcelName}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      parcel.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewIncoming;
