import React, { useState } from "react";
import { useGetTrackingEventsQuery } from "../../features/parcel/parcelApi";


const ParcelTrackingPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [searchId, setSearchId] = useState("");

 
  const { data, isLoading, isError } = useGetTrackingEventsQuery(searchId, {
    skip: !searchId, 
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchId(trackingId.trim());
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Track Your Parcel Here</h1>

      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID (e.g., TRK-20251020-000001)"
          className="flex-1 border rounded-l px-4 py-2"
        />
        <button
          type="submit"
          className="bg-[#039396de] text-white px-4 py-2 rounded-r hover:bg-[#039396f8]"
        >
          Search
        </button>
      </form>

      {isLoading && <p>Loading tracking events...</p>}
      {isError && <p className="text-red-500">Failed to fetch tracking events.</p>}
      {!isLoading && data && data.success && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <p>
            <strong>Sender:</strong> {data.data.sender}
          </p>
          <p>
            <strong>Fee:</strong> {data.data.fee} Taka
          </p>

          <h2 className="mt-4 mb-2 text-xl font-semibold">Tracking Events</h2>
          {data.data.trackingEvents.length === 0 ? (
            <p>No events found for this parcel.</p>
          ) : (
            <table className="min-w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">#</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Note</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {data.data.trackingEvents.map((event: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm">{event.status}</td>
                    <td className="px-4 py-2 text-sm">{event.note}</td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ParcelTrackingPage;
