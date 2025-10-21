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
  const parcelsPerPage = 10;

  // ---------------- Filter by receiver phone ----------------
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
    <div className="space-y-6">
      {/* ---------------- Search Bar ---------------- */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by receiver..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page on search
            }}
            className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* ---------------- Parcels Grid ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedParcels.map((parcel) => (
          <div
            key={parcel.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
            onClick={() => navigate(`/sender/parcels/${parcel.id}`)}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-teal-500">{parcel.trackingId}</span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  parcel.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : parcel.status === "In Transit"
                    ? "bg-yellow-100 text-yellow-700"
                    : parcel.status === "Pending"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {parcel.status}
              </span>
            </div>

            {/* Body */}
            <div className="mb-3">
              <p className="text-gray-700 dark:text-gray-300"><strong>Receiver:</strong> {parcel.receiver}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Type:</strong> {parcel.type}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Weight:</strong> {parcel.weight} kg</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Fee:</strong> ${parcel.fee}</p>
            </div>

            {/* Footer */}
            <div className="text-gray-400 text-sm flex justify-between items-center">
              <span>{new Date(parcel.createdAt).toLocaleDateString()}</span>
              <span className="text-gray-500 text-xs">Click to view details</span>
            </div>
          </div>
        ))}
        {paginatedParcels.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No parcels found.</p>
        )}
      </div>

      {/* ---------------- Pagination ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
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
