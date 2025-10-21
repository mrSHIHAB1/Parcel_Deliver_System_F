import React, { useMemo, useState } from "react";
import { useGetParcelsQuery } from "../../../features/parcel/parcelApi";
import OverviewCard from "../../../components/DataVisualization/OverviewCard";
import Truck from "../../../assets/Truck.svg";
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
import { Moon, Search, Sun } from "lucide-react"; // icon for search
import { useTheme } from "../../../hooks/useTheme";

export function SenderDashboard() {
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;
const { theme, toggleTheme } = useTheme();
  return (
    <div className="p-6 pt-0 min-h-screen dark:bg-gray-900">
      {/* ---------------- Header ---------------- */}
      <div className="flex pb-5 justify-between">
        <div className="flex justify-center items-center space-x-3 font-semibold text-gray-800 dark:text-gray-200">
          
          <img src={Truck} className="w-10" alt="Truck" />
          <p>Sender Dashboard</p>
        </div>
        <div>
          <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <Moon className="w-5 h-5 text-gray-800" />
                      )}
                    </button>
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
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Parcel Status Distribution
          </h2>
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

        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Monthly Parcel Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyShipments}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Bar dataKey="count" fill="#2196F3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------------- Search Bar ---------------- */}
      <div className="mb-6 flex items-center w-full max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by receiver phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg py-2 pl-10 pr-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-300" />
        </div>
      </div>

      {/* ---------------- Parcel Table ---------------- */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Your Parcels
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Tracking ID</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Receiver</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Type</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Weight</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Status</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredParcels.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.trackingId}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.receiver}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.type}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.weight} kg</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white font-semibold ${
                        p.status === "Delivered"
                          ? "bg-green-500"
                          : p.status === "In Transit"
                          ? "bg-yellow-500"
                          : p.status === "Pending"
                          ? "bg-blue-500"
                          : p.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{p.fee}</td>
                </tr>
              ))}
              {filteredParcels.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
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
}
