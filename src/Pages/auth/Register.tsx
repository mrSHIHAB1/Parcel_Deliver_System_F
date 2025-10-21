import { useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("SENDER");
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(name,email,password,phone,address,role)
      await registerMutation({ name,email,password,phone,address,  role }).unwrap();
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border w-full p-2 mb-2"/>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-2 mb-2"/>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-2 mb-2"/>
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="border w-full p-2 mb-2"/>
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="border w-full p-2 mb-2"/>
        <select value={role} onChange={e => setRole(e.target.value)} className="border w-full p-2 mb-2">
          <option value="SENDER">Sender</option>
          <option value="RECIVER">Receiver</option>
        </select>
        <button className="bg-[#039396de] text-white w-full py-2 rounded">Register</button>
      </form>
    </div>
  );
}
