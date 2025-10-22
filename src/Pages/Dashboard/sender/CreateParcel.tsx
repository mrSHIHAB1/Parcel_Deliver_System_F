import { useState } from "react";
import { useCreateParcelMutation } from "../../../features/parcel/parcelApi";
import { toast } from "react-hot-toast";

export default function CreateParcel() {
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    type: "",
    weight: "",
    baseFee: "",
    couponCode: "",
    fromAddress: "",
    toAddress: "",
    status: "Requested",
  });

  const [errors, setErrors] = useState<any>({});
  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

const validateForm = () => {
  const newErrors: any = {};

  if (!form.sender || form.sender.trim().length < 11) newErrors.sender = "Sender phone is required";
  if (!form.receiver|| form.receiver.trim().length < 11) newErrors.receiver = "Receiver phone is required";
  if (!form.type) newErrors.type = "Parcel type is required";

  if (!form.weight || isNaN(Number(form.weight)) || Number(form.weight) <= 0)
    newErrors.weight = "Weight must be a number greater than 0";

  if (!form.baseFee || isNaN(Number(form.baseFee)) || Number(form.baseFee) <= 0)
    newErrors.baseFee = "Base Fee must be a number greater than 0";

  if (!form.fromAddress || form.fromAddress.trim().length < 5) {
    newErrors.fromAddress = "From Address is required (min 5 characters)";
  }

  if (!form.toAddress || form.toAddress.trim().length < 5) {
    newErrors.toAddress = "To Address is required (min 5 characters)";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload: any = {
      ...form,
      weight: Number(form.weight),
      baseFee: Number(form.baseFee),
    };

    if (!payload.couponCode) delete payload.couponCode;

    try {
      await createParcel(payload).unwrap();
      toast.success("Parcel created successfully!");
      setForm({
        sender: "",
        receiver: "",
        type: "",
        weight: "",
        baseFee: "",
        couponCode: "",
        fromAddress: "",
        toAddress: "",
        status: "Requested",
      });
      setErrors({});
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Create Parcel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">Sender Phone</label>
          <input
            type="text"
            name="sender"
            value={form.sender}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
          {errors.sender && <p className="text-red-500 text-sm mt-1">{errors.sender}</p>}
        </div>

     
        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">Receiver Phone</label>
          <input
            type="text"
            name="receiver"
            value={form.receiver}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
          {errors.receiver && <p className="text-red-500 text-sm mt-1">{errors.receiver}</p>}
        </div>

  
        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">Parcel Type</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

      
        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            min={0}
            required
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>

        
        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">Base Fee</label>
          <input
            type="number"
            name="baseFee"
            value={form.baseFee}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            min={0}
            required
          />
          {errors.baseFee && <p className="text-red-500 text-sm mt-1">{errors.baseFee}</p>}
        </div>

     
        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">Coupon Code (Optional)</label>
          <input
            type="text"
            name="couponCode"
            value={form.couponCode}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">From Address</label>
          <input
            type="text"
            name="fromAddress"
            value={form.fromAddress}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
          {errors.fromAddress && <p className="text-red-500 text-sm mt-1">{errors.fromAddress}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">To Address</label>
          <input
            type="text"
            name="toAddress"
            value={form.toAddress}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
          {errors.toAddress && <p className="text-red-500 text-sm mt-1">{errors.toAddress}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
      >Create Parcel
      </button>
    </form>
  );
}
