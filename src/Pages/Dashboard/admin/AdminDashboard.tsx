import React from 'react'
import OverviewCard from '../../../components/DataVisualization/OverviewCard';
import { useGetAllParcelsQuery } from '../../../features/parcel/adminApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import Truck from "../../../assets/Truck.svg"
export const AdminDashboard = () => {
  const { data, isLoading, isError } = useGetAllParcelsQuery();

  const parcels = data?.data || [];

  const totalParcels = parcels.length;
  const delivered = parcels.filter(p => p.status === "Delivered").length;
  const inTransit = parcels.filter(p =>
    ["In Transit", "Approved"].includes(p.status)
  ).length;
  const pendingOrCancelled = parcels.filter(p =>
    ["Pending", "Cancelled"].includes(p.status)
  ).length;


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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching parcels</p>;

  return (
    <div>
      <div className="flex pb-5 justify-between">
    <div>
      <div className="flex font-bold items-center justify-center space-x-2"><img src={Truck} className="w-10"></img><p>Admin Dashboard</p></div>
    </div>
     
  </div>
      {/* Overview Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <OverviewCard title="Total Parcels" value={totalParcels} color="bg-indigo-500" />
        <OverviewCard title="Delivered" value={delivered} color="bg-green-500" />
        <OverviewCard title="In Transit" value={inTransit} color="bg-yellow-500" />
        <OverviewCard title="Pending / Cancelled" value={pendingOrCancelled} color="bg-red-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Delivery Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Shipment Trends</h2>
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
    </div>
  );
};
