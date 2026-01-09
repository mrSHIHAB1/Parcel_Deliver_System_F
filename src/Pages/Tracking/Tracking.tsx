import React, { useState } from "react";
import { MapPin, Clock, User } from "lucide-react";
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
    <div className="max-w-4xl mx-auto p-6 space-y-6 dark:bg-gray-800 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
        Track Your Parcel
      </h1>
<p className="text-center text-gray-400">Demo TrackingID: TRK-20250801-527997</p>
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID "
          className="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-white dark:text-white"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-r hover:bg-teal-600 transition"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-center py-4">
          Failed to fetch tracking events.
        </p>
      )}


      {!isLoading && data && data.success && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4">

          <div className="space-y-2 mb-4">
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <User className="w-5 h-5" /> <strong>Sender:</strong>{" "}
              {data.data.sender}
            </p>
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="w-5 h-5" /> <strong>Fee:</strong> {data.data.fee}{" "}
              Taka
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-4">Tracking Timeline</h3>
          {data.data.trackingEvents.length === 0 ? (
            <p className="text-gray-500">No events found for this parcel.</p>
          ) : (
            <div className="relative border-l-2 border-gray-200 dark:border-gray-600 ml-4">
              {data.data.trackingEvents.map((log: any, index: number) => (
                <div key={index} className="mb-6 ml-6 relative">

                  <span
                    className={`absolute -left-11 top-0 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
                    ${log.status === "Delivered"
                        ? "bg-green-500"
                        : log.status === "In Transit"
                          ? "bg-yellow-500"
                          : log.status === "Cancelled"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                  >
                    {index + 1}
                  </span>
                  {/* Event card */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {log.status}
                    </p>
                    {log.note && (
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Note:</strong> {log.note}
                      </p>
                    )}
                    {log.location && (
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Location: {log.location}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParcelTrackingPage;
