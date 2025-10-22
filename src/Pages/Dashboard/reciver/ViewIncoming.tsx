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
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        Incoming Parcels
      </h2>

      
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-xs">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-white dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Sender</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Parcel Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Requested Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.data.map((parcel: any, index: number) => (
              <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{parcel.sender}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{parcel.type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                      parcel.status === "Delivered"
                        ? "bg-green-500"
                        : parcel.status === "In Transit"
                        ? "bg-yellow-500"
                        : parcel.status === "Pending"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => navigate(`/receiver/parcels/${parcel._id}`)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {data.data.map((parcel: any) => (
          <div key={parcel._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-white">{parcel.type}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                  parcel.status === "Delivered"
                    ? "bg-green-500"
                    : parcel.status === "In Transit"
                    ? "bg-yellow-500"
                    : parcel.status === "Pending"
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
              >
                {parcel.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <strong>Sender:</strong> {parcel.sender}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              <strong>Requested Date:</strong> {new Date(parcel.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => navigate(`/receiver/parcels/${parcel._id}`)}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-md text-sm transition"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIncoming;
