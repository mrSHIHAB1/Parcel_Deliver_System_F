import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Auto-fill credentials
  const fillCredentials = (role: "SENDER" | "RECIVER" | "ADMIN") => {
    if (role === "SENDER") {
      setEmail("sender@gmail.com");
      setPassword("Sender12@");
    } else if (role === "RECIVER") {
      setEmail("receiver@gmail.com");
      setPassword("Receiver12@");
    } else if (role === "ADMIN") {
      setEmail("admin@gmail.com");
      setPassword("Admin12@");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await loginMutation({ email, password }).unwrap();

      dispatch(
        setCredentials({
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          role: res.data.user.role,
          user: res.data.user,
        })
      );

      const userRole = res.data.user.role;
      toast.success("Login successful!");

      if (userRole === "SENDER") navigate("/sender");
      else if (userRole === "RECIVER") navigate("/receiver");
      else if (userRole === "ADMIN") navigate("/admin");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-[#0F1F1A] transition-colors duration-300 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700 dark:text-teal-300">
          Welcome Back
        </h2>

        {/* 🔹 Quick Login Buttons */}
        

        {/* Email */}
        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
        />

        {/* Password */}
        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
          className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
        />

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-teal-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          } text-white w-full py-3 rounded-lg font-semibold transition-all mb-4 flex items-center justify-center`}
        >
          {isLoading ? "Please wait..." : "Login"}
        </button>
<div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => fillCredentials("SENDER")}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold"
          >
            Sender
          </button>

          <button
            type="button"
            onClick={() => fillCredentials("RECIVER")}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-semibold"
          >
            Receiver
          </button>

          <button
            type="button"
            onClick={() => fillCredentials("ADMIN")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold"
          >
            Admin
          </button>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-4">
          or
        </p>

        {/* Register */}
        <Link to="/register">
          <button
            type="button"
            className="border border-teal-600 hover:bg-teal-100 dark:hover:bg-gray-700 w-full py-3 rounded-lg font-semibold transition-colors text-teal-600 dark:text-teal-300"
          >
            Register
          </button>
        </Link>

        {/* Forgot Password */}
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
          Forgot your password?{" "}
          <Link
            to="/forgot-password"
            className="text-teal-600 dark:text-teal-300 hover:underline"
          >
            Reset here
          </Link>
        </p>
      </form>
    </div>
  );
}
