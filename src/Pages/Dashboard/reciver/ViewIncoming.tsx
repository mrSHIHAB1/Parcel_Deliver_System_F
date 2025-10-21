import { useGetReceiverParcelsQuery } from "../../../features/parcel/parcelApi";
import { useNavigate } from "react-router-dom";

const ViewIncoming = () => {
  const { data, isLoading, isError } = useGetReceiverParcelsQuery();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;

  if (!data || data.data.length === 0)
    return <p className="text-center mt-10 text-gray-600">No incoming parcels found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
       Incoming Parcels
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
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
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{parcel.senderName}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{parcel.parcelName}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      parcel.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
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

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {data.data.map((parcel: any, index: number) => (
          <div
            key={parcel._id}
            onClick={() => navigate(`/receiver/parcels/${parcel._id}`)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-white">{parcel.parcelName}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  parcel.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {parcel.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <strong>Sender:</strong> {parcel.senderName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Date:</strong> {new Date(parcel.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIncoming;
