import { useMemo, useState } from "react";
import { useGetReceiverParcelsQuery } from "../../../features/parcel/parcelApi";
import OverviewCard from "../../../components/DataVisualization/OverviewCard";
import Truck from "../../../assets/Truck.svg";
import { useTheme } from "../../../hooks/useTheme";
import { Moon, Sun, Search } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell,  Tooltip } from "recharts";

export function ReceiverDashboard() {
  const { data, isLoading, isError } = useGetReceiverParcelsQuery();
  const { theme, toggleTheme } = useTheme();
  const parcels = data?.data || [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  const totalParcels = parcels.length;
  const delivered = parcels.filter((p) => p.status === "Delivered").length;
  const inTransit = parcels.filter((p) =>
    ["In Transit", "Approved", "Dispatched"].includes(p.status)
  ).length;
  const pending = parcels.filter((p) => ["Pending,Requested"].includes(p.status)).length;
  const cancelled = parcels.filter((p) => p.status === "Cancelled").length;


  const filteredParcels = useMemo(() => {
    return parcels
      .filter(
        (p) =>
          p.trackingId.toLowerCase().includes(search.toLowerCase()) ||
          p.sender.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) => (statusFilter ? p.status === statusFilter : true));
  }, [parcels, search, statusFilter]);


  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    parcels.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [parcels]);

  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9E9E9E"];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">

      <div className="flex justify-between items-center pb-10">
        <div className="flex items-center space-x-3 font-semibold text-gray-800 dark:text-gray-200">
          <img src={Truck} className="w-10" alt="Truck" />
          <p>Receiver Dashboard</p>
        </div>
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


      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <OverviewCard title="Total Parcels" value={totalParcels} color="bg-indigo-500" />
        <OverviewCard title="Delivered" value={delivered} color="bg-green-500" />
        <OverviewCard title="In Transit" value={inTransit} color="bg-yellow-500" />
        <OverviewCard title="Pending" value={pending} color="bg-blue-500" />
        <OverviewCard title="Cancelled" value={cancelled} color="bg-red-500" />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Parcel Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {statusCounts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

  
      <div className="flex flex-col sm:flex-row gap-4 mb-4 max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Tracking ID or Sender"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-300" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="In Transit">In Transit</option>
          <option value="Pending">Pending</option>
          <option value="Requested">Requested</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>


      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Your Parcels</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 hidden md:table-header-group">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Tracking ID</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Sender</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Type</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Requested</th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredParcels.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer block md:table-row mb-4 md:mb-0">
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200 block md:table-cell">
                    <span className="font-semibold md:hidden">Tracking ID: </span>{p.trackingId}
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200 block md:table-cell">
                    <span className="font-semibold md:hidden">Sender: </span>{p.sender}
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200 block md:table-cell">
                    <span className="font-semibold md:hidden">Type: </span>{p.type}
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200 block md:table-cell">
                    <span className="font-semibold md:hidden">Expected Delivery: </span>{new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 block md:table-cell">
                    <span className="font-semibold md:hidden">Status: </span>
                    <span className={`px-2 py-1 rounded-full text-white font-semibold ${
                      p.status === "Delivered"
                        ? "bg-green-500"
                        : p.status === "In Transit"
                        ? "bg-yellow-500"
                        : p.status === "Pending"
                        ? "bg-blue-500"
                        : p.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredParcels.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">No parcels found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
