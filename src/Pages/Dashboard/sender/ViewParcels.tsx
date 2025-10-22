import { useState, useMemo } from "react";
import { useGetParcelsQuery } from "../../../features/parcel/parcelApi";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function ViewParcels() {
  const { data: response, isLoading, isError } = useGetParcelsQuery();
  const parcels = response?.data || [];
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const parcelsPerPage = 9;

  const filteredParcels = useMemo(() => {
    if (!searchTerm) return parcels;
    return parcels.filter((p) =>
      p.receiver?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [parcels, searchTerm]);

  const totalPages = Math.ceil(filteredParcels.length / parcelsPerPage);

  const paginatedParcels = filteredParcels.slice(
    (currentPage - 1) * parcelsPerPage,
    currentPage * parcelsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;

  return (
    <div className="space-y-6 p-4">

      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by receiver..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>


      <div className="hidden md:block overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Tracking ID</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Receiver</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Type</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Weight</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Fee</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Status</th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Created At</th>
              <th className="px-4 py-2 text-center text-gray-800 dark:text-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedParcels.length > 0 ? (
              paginatedParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{parcel.trackingId}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{parcel.receiver}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{parcel.type}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{parcel.weight} kg</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">${parcel.fee}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white font-semibold ${parcel.status === "Delivered"
                          ? "bg-green-500"
                          : parcel.status === "In Transit"
                            ? "bg-yellow-500"
                            : parcel.status === "Pending"
                              ? "bg-red-500"
                              : "bg-gray-500"
                        }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-sm">
                    {new Date(parcel.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/sender/parcels/${parcel.id}`)}
                      className="px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {paginatedParcels.length > 0 ? (
          paginatedParcels.map((parcel) => (
            <div key={parcel.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 dark:text-white">{parcel.trackingId}</h3>
                <span className="text-gray-500 dark:text-gray-300">{parcel.type}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Receiver: {parcel.receiver}</p>
              <p className="text-gray-700 dark:text-gray-300">Weight: {parcel.weight} kg</p>
              <p className="text-gray-700 dark:text-gray-300">Fee: ${parcel.fee}</p>
              <p className="text-gray-700 dark:text-gray-300">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-white font-semibold ${parcel.status === "Delivered"
                      ? "bg-green-500"
                      : parcel.status === "In Transit"
                        ? "bg-yellow-500"
                        : parcel.status === "Pending"
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                >
                  {parcel.status}
                </span>
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Created At: {new Date(parcel.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/sender/parcels/${parcel.id}`)}
                className="w-full px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No parcels found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1
                  ? " text-black dark:text-white"
                  : "text-black dark:text-white"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
