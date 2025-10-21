import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApi";

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

      dispatch(
        setCredentials({
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          role: res.data.user.role,
          user: res.data.user,
        })
      );

      const userRole = res.data.user.role;
      toast.success("Login successful!", { duration: 2000 });

      if (userRole === "SENDER") navigate("/sender");
      else if (userRole === "RECIVER") navigate("/receiver");
      else if (userRole === "ADMIN") navigate("/admin");
    } catch (err: any) {
      toast.error("Failed: " + err.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700 dark:text-teal-300">
          Welcome Back
        </h2>

     
        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
        />

    
        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
        />

     
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 rounded-lg font-semibold transition-colors mb-4"
        >
          Login
        </button>

        <p className="text-center text-gray-500 dark:text-gray-300 mb-4">or</p>

       
        <Link to="/register">
          <button className="border border-teal-600 hover:bg-teal-100 dark:hover:bg-gray-700 w-full py-3 rounded-lg font-semibold transition-colors text-teal-600 dark:text-teal-300">
            Register
          </button>
        </Link>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-teal-600 dark:text-teal-300 hover:underline">
            Reset here
          </Link>
        </p>
      </form>
    </div>
  );
}
