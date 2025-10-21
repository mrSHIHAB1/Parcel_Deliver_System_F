import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllParcelsQuery } from "../../../features/parcel/adminApi";

const AdminParcelsTable = () => {
  const { data, isLoading } = useGetAllParcelsQuery();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState("All");

  const itemsPerPage = 10;
  const parcels = data?.data || [];

  // --- Filter & Search & Date Range ---
  const filteredParcels = useMemo(() => {
    const now = new Date();
    return parcels
      .filter((p) => {
        if (statusFilter !== "All" && p.status !== statusFilter) return false;

        const createdAt = new Date(p.createdAt);
        switch (dateRange) {
          case "Today":
            return createdAt.toDateString() === now.toDateString();
          case "LastDay":
            const yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);
            return createdAt.toDateString() === yesterday.toDateString();
          case "ThisWeek":
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            return createdAt >= startOfWeek && createdAt <= now;
          case "ThisMonth":
            return (
              createdAt.getMonth() === now.getMonth() &&
              createdAt.getFullYear() === now.getFullYear()
            );
          default:
            return true;
        }
      })
      .filter((p) =>
        p.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        p.sender.toLowerCase().includes(search.toLowerCase()) ||
        p.receiver.toLowerCase().includes(search.toLowerCase())
      );
  }, [parcels, search, statusFilter, dateRange]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParcels = filteredParcels.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );

 

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Parcels Management
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by Tracking ID, Sender, Receiver"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-teal-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded-lg w-full md:w-1/5 focus:ring-2 focus:ring-teal-400"
        >
          <option value="All">All Status</option>
          <option value="Requested">Requested</option>
          <option value="Approved">Approved</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => {
            setDateRange(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded-lg w-full md:w-1/5 focus:ring-2 focus:ring-teal-400"
        >
          <option value="All">All Time</option>
          <option value="Today">Today</option>
          <option value="LastDay">Last Day</option>
          <option value="ThisWeek">This Week</option>
          <option value="ThisMonth">This Month</option>
        </select>
      </div>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Tracking ID</th>
              <th className="px-4 py-3 text-left">Sender</th>
              <th className="px-4 py-3 text-left">Receiver</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Requested</th>
              <th className="px-4 py-3 text-center">Logs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600 dark:text-white">
            {currentParcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3">{parcel.trackingId}</td>
                <td className="px-4 py-3">{parcel.sender}</td>
                <td className="px-4 py-3">{parcel.receiver}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      parcel.status === "Delivered"
                        ? "bg-green-500"
                        : parcel.status === "Approved"
                        ? "bg-teal-500"
                        : parcel.status === "Pending"
                        ? "bg-yellow-500"
                        : parcel.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/admin/parcels/${parcel._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                   Update 
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {currentParcels.map((parcel) => (
          <div
            key={parcel._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800 dark:text-white">
                {parcel.trackingId}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                  parcel.status === "Delivered"
                    ? "bg-green-500"
                    : parcel.status === "Approved"
                    ? "bg-teal-500"
                    : parcel.status === "Pending"
                    ? "bg-yellow-500"
                    : parcel.status === "Cancelled"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {parcel.status}
              </span>
            </div>
            <p>
              <strong>Sender:</strong> {parcel.sender}
            </p>
            <p>
              <strong>Receiver:</strong> {parcel.receiver}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(parcel.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/parcels/${parcel._id}`)}
                className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View
              </button>
              
            
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminParcelsTable;
