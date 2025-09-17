import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await loginMutation({ email, password }).unwrap();
      dispatch(setCredentials({
        token: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        role: res.data.user.role,
        user: res.data.user,
      }));

      // Role-based redirect
      if (res.data.user.role === "SENDER") navigate("/sender/dashboard");
      else if (res.data.user.role === "RECIVER") navigate("/receiver/dashboard");
      else if (res.data.user.role === "ADMIN") navigate("/admin/dashboard");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" className="border w-full p-2 mb-2"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" className="border w-full p-2 mb-2"/>
        <button className="bg-blue-500 text-white w-full py-2 rounded">Login</button>
        <p className="text-center">or</p>
        <div className="text-center">
            <Link to={"/register"}><button className="btn w-full">Register</button></Link>
        </div>
      </form>
        
    </div>
  );
}
