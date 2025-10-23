import {
  useGetReceiverHistoryQuery,
  useConfirmReceiverParcelMutation,
} from "../../../features/parcel/parcelApi";
import { CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const DeliveryHistory = () => {
  const { data, isLoading, isError } = useGetReceiverHistoryQuery();
  const [confirmParcel, { isLoading: isConfirming }] =
    useConfirmReceiverParcelMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🌀 Light transparent background when loading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 bg-white/50 dark:bg-gray-900/50">
        <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load parcels.
      </p>
    );

  if (!data || data.data.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        No parcels found.
      </p>
    );

  const handleConfirm = async (id: string) => {
    try {
      await confirmParcel({ id }).unwrap();
    } catch (err) {
      console.error("Failed to confirm parcel", err);
    }
  };

  // 🧮 Pagination logic
  const totalParcels = data.data.length;
  const totalPages = Math.ceil(totalParcels / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParcels = data.data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center mt-5">
        Delivery History
      </h2>

      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-2xl p-6">
        {/* Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-white dark:bg-gray-700">
              <tr>
                {[
                  "No",
                  "Sender",
                  "Parcel",
                  "Status",
                  "Delivered On",
                  "Received?",
                ].map((head, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentParcels.map((parcel: any, index: number) => (
                <tr
                  key={parcel._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                    {parcel.sender}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                    {parcel.type}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                        parcel.status === "Delivered"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                    {new Date(parcel.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {parcel.reciverConfiramtion === "Confirmed" ? (
                      <CheckCircle className="text-green-500 w-5 h-5 inline-block" />
                    ) : (
                      <button
                        onClick={() => handleConfirm(parcel._id)}
                        disabled={isConfirming}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 text-sm"
                      >
                        {isConfirming ? "..." : "Confirm"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for small screens */}
        <div className="md:hidden grid gap-4">
          {currentParcels.map((parcel: any, index: number) => (
            <div
              key={parcel._id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-700 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {parcel.type}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    parcel.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {parcel.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Sender:</strong> {parcel.sender}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Delivered On:</strong>{" "}
                {new Date(parcel.updatedAt).toLocaleDateString()}
              </p>

              <div className="mt-3 flex items-center justify-between">
                {parcel.reciverConfiramtion === "Confirmed" ? (
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Confirmed
                  </span>
                ) : (
                  <button
                    onClick={() => handleConfirm(parcel._id)}
                    disabled={isConfirming}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 text-sm"
                  >
                    {isConfirming ? "..." : "Confirm"}
                  </button>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {startIndex + index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

  
      </div>
          
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Prev
          </button>
          <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Next
          </button>
        </div>
    </>
  );
};

export default DeliveryHistory;
