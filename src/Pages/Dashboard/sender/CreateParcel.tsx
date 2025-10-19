// src/Pages/Dashboard/sender/CreateParcel.tsx
import { useState } from "react";
import { useCreateParcelMutation } from "../../../features/parcel/parcelApi";
import { toast } from "react-hot-toast";

export default function CreateParcel() {
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    type: "",
    weight: 0,
    baseFee: 0,
    couponCode: "",
    fromAddress: "",
    toAddress: "",
    status: "Requested",
  });

  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Convert weight and baseFee to numbers
    if (name === "weight" || name === "baseFee") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare payload
    const payload: any = { ...form,weight: Number(form.weight),
    baseFee: Number(form.baseFee), };

    // Remove couponCode if empty
    if (!payload.couponCode) {
      delete payload.couponCode;
    }
console.log(payload)
    try {
     const res:any= await createParcel(payload).unwrap();
      toast.success("Parcel created successfully!");

      // Reset form
      setForm({
        sender: "",
        receiver: "",
        type: "",
        weight: 0,
        baseFee: 0,
        couponCode: "",
        fromAddress: "",
        toAddress: "",
        status: "Requested",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 dark:text-white">Create Parcel</h2>

      <input
        type="text"
        name="sender"
        placeholder="Sender Phone"
        value={form.sender}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="receiver"
        placeholder="Receiver Phone"
        value={form.receiver}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="type"
        placeholder="Parcel Type"
        value={form.type}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="number"
        name="weight"
        placeholder="Weight"
        value={form.weight}
        onChange={handleChange}
        className="input"
        min={0}
        required
      />

      <input
        type="number"
        name="baseFee"
        placeholder="Base Fee"
        value={form.baseFee}
        onChange={handleChange}
        className="input"
        min={0}
        required
      />

      <input
        type="text"
        name="couponCode"
        placeholder="Coupon Code (optional)"
        value={form.couponCode}
        onChange={handleChange}
        className="input"
      />

      <input
        type="text"
        name="fromAddress"
        placeholder="From Address"
        value={form.fromAddress}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="toAddress"
        placeholder="To Address"
        value={form.toAddress}
        onChange={handleChange}
        className="input"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? "Creating..." : "Create Parcel"}
      </button>
    </form>
  );
}
