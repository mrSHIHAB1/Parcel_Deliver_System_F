import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllParcelsQuery } from "../../../features/parcel/adminApi";

const AdminParcelsTable = () => {
  const { data, isLoading } = useGetAllParcelsQuery();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState("All"); // New state

  const itemsPerPage = 10;
  const parcels = data?.data || [];

  // --- Filter & Search & Date Range ---
  const filteredParcels = useMemo(() => {
    const now = new Date();
    return parcels
      .filter((p) => {
        // --- Status Filter ---
        if (statusFilter !== "All" && p.status !== statusFilter) return false;

        // --- Date Range Filter ---
        const createdAt = new Date(p.createdAt);
        switch (dateRange) {
          case "Today":
            return (
              createdAt.toDateString() === now.toDateString()
            );
          case "LastDay":
            const yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);
            return createdAt.toDateString() === yesterday.toDateString();
          case "ThisWeek":
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
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

  if (isLoading) return <p>Loading parcels...</p>;

  return (
    <div className="p-4">
      {/* --- Search, Status & Date Filter --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by Tracking ID, Sender, Receiver"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
          className="px-4 py-2 border rounded w-full md:w-1/3"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded w-full md:w-1/5"
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
          className="px-4 py-2 border rounded w-full md:w-1/5"
        >
          <option value="All">All Time</option>
          <option value="Today">Today</option>
          <option value="LastDay">Last Day</option>
          <option value="ThisWeek">This Week</option>
          <option value="ThisMonth">This Month</option>
        </select>
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Tracking ID</th>
              <th className="px-4 py-2 border">Sender</th>
              <th className="px-4 py-2 border">Receiver</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentParcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{parcel.trackingId}</td>
                <td className="px-4 py-2 border">{parcel.sender}</td>
                <td className="px-4 py-2 border">{parcel.receiver}</td>
                <td className="px-4 py-2 border">{parcel.status}</td>
                <td className="px-4 py-2 border">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => navigate(`/admin/parcels/${parcel._id}`)}
                  >
                    View
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">
                    Cancel
                  </button>
                  <button className="px-2 py-1 bg-green-500 text-white rounded">
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Pagination --- */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminParcelsTable;
