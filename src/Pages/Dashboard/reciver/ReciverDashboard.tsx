import  { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReceiverHistoryQuery } from "../../../features/parcel/parcelApi"; // adjust path
import OverviewCard from "../../../components/DataVisualization/OverviewCard";

export  function ReceiverDashboard() {
   const { data, isLoading, isError } = useGetReceiverHistoryQuery();
  const navigate = useNavigate();

  const parcels = data?.data || [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  const totalParcels = parcels.length;
  const delivered = parcels.filter(p => p.status === "Delivered").length;
  const inTransit = parcels.filter(p => ["In Transit", "Approved", "Dispatched"].includes(p.status)).length;
  const pending = parcels.filter(p => ["Pending", "Awaiting Pickup"].includes(p.status)).length;
  const cancelled = parcels.filter(p => p.status === "Cancelled").length;

  const filteredParcels = useMemo(() => {
    return parcels
      .filter(p =>
        p.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        p.sender.toLowerCase().includes(search.toLowerCase())
      )
      .filter(p => (statusFilter ? p.status === statusFilter : true));
  }, [parcels, search, statusFilter]);

 
  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error fetching parcels.</p>;
  return (
    <div className="p-6">
     
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <OverviewCard title="Total Parcels" value={totalParcels} color="bg-indigo-500" />
        <OverviewCard title="Delivered" value={delivered} color="bg-green-500" />
        <OverviewCard title="In Transit" value={inTransit} color="bg-yellow-500" />
        <OverviewCard title="Pending" value={pending} color="bg-blue-500" />
        <OverviewCard title="Cancelled" value={cancelled} color="bg-red-500" />
      </div>

      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Tracking ID or Sender"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="In Transit">In Transit</option>
          <option value="Pending">Pending</option>
          <option value="Awaiting Pickup">Awaiting Pickup</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

    
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Your Parcels</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Tracking ID</th>
                <th className="px-4 py-2 text-left">Sender</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Expected Delivery</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredParcels.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{p.trackingId}</td>
                  <td className="px-4 py-2">{p.sender}</td>
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="px-4 py-2">{new Date(p.expectedDelivery).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/receiver/parcels/${p.id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                   
                    <button
                      onClick={() => alert("Report issue clicked")}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Report Issue
                    </button>
                  </td>
                </tr>
              ))}

              {filteredParcels.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
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
