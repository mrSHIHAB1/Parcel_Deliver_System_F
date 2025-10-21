import React, { useMemo, useState } from "react";
import { useGetParcelsQuery } from "../../../features/parcel/parcelApi";
import OverviewCard from "../../../components/DataVisualization/OverviewCard";
import Truck from "../../../assets/Truck.svg"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Search } from "lucide-react"; // icon for search

export const SenderDashboard = () => {
  const { data, isLoading, isError } = useGetParcelsQuery();
  const parcels = data?.data || [];

  const [searchTerm, setSearchTerm] = useState("");

  // ---------------- Filter parcels by receiver phone ----------------
  const filteredParcels = useMemo(() => {
    if (!searchTerm) return parcels;
    return parcels.filter((p) => p.receiver?.includes(searchTerm));
  }, [parcels, searchTerm]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    parcels.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [parcels]);

  const monthlyShipments = useMemo(() => {
    const months: Record<string, number> = {};
    parcels.forEach((p) => {
      const month = new Date(p.createdAt).toLocaleString("default", {
        month: "short",
      });
      months[month] = (months[month] || 0) + 1;
    });
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  }, [parcels]);

  const totalParcels = parcels.length;
  const delivered = parcels.filter((p) => p.status === "Delivered").length;
  const inTransit = parcels.filter((p) =>
    ["In Transit", "Approved", "Dispatched"].includes(p.status)
  ).length;
  const pendingOrCancelled = parcels.filter((p) =>
    ["Pending", "Cancelled"].includes(p.status)
  ).length;

  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

  if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
    </div>
  );
}

if (isError) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
      <svg
        className="animate-bounce w-12 h-12 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2z"
        />
      </svg>
      <p className="text-lg font-semibold">Failed to load parcels. Please try again.</p>
    </div>
  );
}


  return (
    <div className="p-6 pt-0 ">
      {/* ---------------- Search Bar ---------------- */}
  <div className="flex pb-5 justify-between">
    <div>
      <div className=""><img src={Truck} className="w-10"></img><p></p></div>
    </div>
       <div className="mb-6 flex items-center w-full max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by receiver phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>
  </div>

      {/* ---------------- Overview Cards ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <OverviewCard title="Total Parcels" value={totalParcels} color="bg-indigo-500" />
        <OverviewCard title="Delivered" value={delivered} color="bg-green-500" />
        <OverviewCard title="In Transit" value={inTransit} color="bg-yellow-500" />
        <OverviewCard
          title="Pending / Cancelled"
          value={pendingOrCancelled}
          color="bg-red-500"
        />
      </div>

      {/* ---------------- Charts ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Parcel Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Parcel Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyShipments}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2196F3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------------- Parcel Table ---------------- */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Your Parcels</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Tracking ID</th>
                <th className="px-4 py-2 text-left">Receiver</th>
                
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Weight</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredParcels.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-2">{p.trackingId}</td>
                  <td className="px-4 py-2">{p.receiver}</td>
                  
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="px-4 py-2">{p.weight} kg</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2">{p.fee}</td>
                </tr>
              ))}
              {filteredParcels.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No parcels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
