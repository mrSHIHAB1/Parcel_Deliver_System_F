import { data } from "react-router-dom";
import { useGetParcelsQuery, useCancelParcelMutation } from "../../../features/parcel/parcelApi";
import { toast } from "react-hot-toast";

export default function ViewParcels() {
  // Fetch the data
  const { data: response, isLoading, isError } = useGetParcelsQuery();
 
  // Extract the array from response
  const parcels = response?.data || [];
 console.log(parcels)
  const [cancelParcel, { isLoading: canceling }] = useCancelParcelMutation();

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel({ id, status: "Cancelled" }).unwrap();
      toast.success("Parcel cancelled successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel parcel");
    }
  };

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Failed to fetch parcels.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parcels.map((parcel) => (
        <div
          key={parcel.id} // you can use trackingId as key
          className="bg-white dark:bg-gray-800 p-4 rounded shadow-md flex flex-col justify-between"
        >
          <div>
            <p><strong>Receiver:</strong> {parcel.receiver}</p>
            <p><strong>Type:</strong> {parcel.type}</p>
            <p><strong>Fee:</strong> {parcel.fee}</p>
            <p><strong>Created At:</strong> {new Date(parcel.status_logs[0]?.timestamp).toLocaleString()}</p>
            <p><strong>Status:</strong> {parcel.status}</p>
          </div>

          {/* Cancel button only if not dispatched or cancelled */}
          {parcel.status !== "Dispatched" && parcel.status !== "Cancelled" && (
            <button
              onClick={() => handleCancel(parcel.id)}
              disabled={canceling}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              {canceling ? "Cancelling..." : "Cancel Parcel"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
