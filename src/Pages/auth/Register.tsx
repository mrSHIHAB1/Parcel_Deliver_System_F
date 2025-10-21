import { useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("SENDER");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();

  
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.length < 2) newErrors.name = "Name must be at least 2 characters";
    else if (name.length > 50) newErrors.name = "Name cannot exceed 50 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else {
      if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
      if (!/[A-Z]/.test(password)) newErrors.password = "Password must contain 1 uppercase letter";
      if (!/\d/.test(password)) newErrors.password = "Password must contain 1 number";
      if (!/[!@#$%^&*]/.test(password)) newErrors.password = "Password must contain 1 special character";
    }

    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^01[3-9]\d{8}$/.test(phone)) newErrors.phone = "Phone must be a valid BD number";

    if (!address.trim()) newErrors.address = "Address is required";
    else if (address.length > 200) newErrors.address = "Address cannot exceed 200 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerMutation({ name, email, password, phone, address, role }).unwrap();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (e: any) {
      toast.error(e.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-800">Register</h2>

        
        <label className="block mb-1 font-semibold text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 w-full p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

       
        <label className="block mb-1 font-semibold text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 w-full p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

      
        <label className="block mb-1 font-semibold text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 w-full p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

       
        <label className="block mb-1 font-semibold text-gray-700">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          placeholder="01XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 w-full p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

       
        <label className="block mb-1 font-semibold text-gray-700">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          placeholder="Your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 w-full p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}

       
        <label className="block mb-1 font-semibold text-gray-700">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="SENDER">Sender</option>
          <option value="RECIVER">Receiver</option>
        </select>

        <button
          type="submit"
          className="bg-teal-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}
