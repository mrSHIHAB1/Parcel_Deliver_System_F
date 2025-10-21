
import { useParams, useNavigate } from "react-router-dom";
import { useGetReceiverParcelsQuery } from "../../../features/parcel/parcelApi";

const ReceiverParcelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch all incoming parcels
  const { data, isLoading, isError } = useGetReceiverParcelsQuery();

  if (isLoading) return <p className="p-4 text-center">Loading parcel details...</p>;
  if (isError) return <p className="p-4 text-center text-red-500">Failed to load parcel.</p>;

  const parcel = data?.data.find((p) => p._id === id);

  if (!parcel) return <p className="p-4 text-center">Parcel not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4 dark:text-white">{parcel.trackingId}</h2>

      <p><strong>Sender:</strong> {parcel.sender}</p>
     
      
      <p><strong>Type:</strong> {parcel.type}</p>
      <p><strong>Weight:</strong> {parcel.weight} kg</p>
      <p><strong>Status:</strong> {parcel.status}</p>
      <p><strong>From:</strong> {parcel.fromAddress}</p>
      <p><strong>To:</strong> {parcel.toAddress}</p>

      <p className="mt-4 font-semibold dark:text-white">Status Logs:</p>
      <div className="max-h-40 overflow-y-auto border p-2 rounded mb-4">
        {parcel.trackingEvents?.map((log: any, index: number) => (
          <div key={index} className="border-b py-1">
            <p><strong>Status:</strong> {log.status}</p>
            {log.note && <p><strong>Note:</strong> {log.note}</p>}
            {log.location && <p><strong>Location:</strong> {log.location}</p>}
            <p className="text-sm text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiverParcelDetails;
