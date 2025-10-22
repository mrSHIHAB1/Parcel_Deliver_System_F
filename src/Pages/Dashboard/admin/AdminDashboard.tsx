import React, { useMemo } from "react";
import OverviewCard from "../../../components/DataVisualization/OverviewCard";
import { useGetAllParcelsQuery } from "../../../features/parcel/adminApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Truck from "../../../assets/Truck.svg";
import { useTheme } from "../../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export const AdminDashboard = () => {
  const { data, isLoading, isError } = useGetAllParcelsQuery();
  const { theme, toggleTheme } = useTheme();
  const parcels = data?.data || [];

  const totalParcels = parcels.length;
  const delivered = parcels.filter((p) => p.status === "Delivered").length;
  const inTransit = parcels.filter((p) => ["In Transit", "Approved"].includes(p.status)).length;
  const pendingOrCancelled = parcels.filter((p) => ["Pending", "Cancelled"].includes(p.status)).length;

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
      const month = new Date(p.createdAt).toLocaleString("default", { month: "short" });
      months[month] = (months[month] || 0) + 1;
    });
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  }, [parcels]);

  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

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
     
      <div className="flex pb-5 justify-between text-gray-800 dark:text-gray-200">
        <div className="flex font-bold items-center justify-center space-x-2">
          <img src={Truck} className="w-10" alt="Truck" />
          <p>Admin Dashboard</p>
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

 
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        <OverviewCard title="Total Parcels" value={totalParcels} color="bg-indigo-500" />
        <OverviewCard title="Delivered" value={delivered} color="bg-green-500" />
        <OverviewCard title="In Transit" value={inTransit} color="bg-yellow-500" />
        <OverviewCard title="Pending / Cancelled" value={pendingOrCancelled} color="bg-red-500" />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
       
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Delivery Status Distribution</h2>
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937", 
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Monthly Shipment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyShipments}>
              <XAxis dataKey="month" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Bar dataKey="count" fill="#2196F3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
