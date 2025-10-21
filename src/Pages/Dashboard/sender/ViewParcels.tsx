import { useGetParcelsQuery } from "../../../features/parcel/parcelApi";
import { useNavigate } from "react-router-dom";

export default function ViewParcels() {
  const { data: response, isLoading, isError } = useGetParcelsQuery();
  const parcels = response?.data || [];
  const navigate = useNavigate();

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Failed to fetch parcels.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Your Parcels</h2>

      <div className="divide-y divide-gray-200">
        {parcels.map((parcel) => (
          <div
            key={parcel.id} // or parcel.trackingId
            className="flex justify-between items-center p-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/sender/parcels/${parcel.id}`)}
          >
            <div>
              <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
              <p><strong>Receiver:</strong> {parcel.receiver}</p>
              <p><strong>Status:</strong> {parcel.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{new Date(parcel.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
