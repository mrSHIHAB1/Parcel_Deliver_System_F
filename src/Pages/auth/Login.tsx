import { useState } from "react";

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

    dispatch(setCredentials({
      token: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      role: res.data.user.role,
      user: res.data.user,
    }));

   
    const userRole = res.data.user.role;
    console.log(userRole)
    if (userRole === "SENDER") navigate("/sender");
    else if (userRole === "RECIVER") navigate("/receiver");
    else if (userRole === "ADMIN") navigate("/admin");

  } catch (err) {
    alert("Login failed");
    console.error(err);
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-[#13161b] ">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" className="border w-full p-2 mb-2"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" className="border w-full p-2 mb-2"/>
        <button className="bg-[#039396de] text-white w-full py-2 rounded dark:bg-black px-4  dark:text-white">Login</button>
        <p className="text-center">or</p>
        <div className="text-center">
            <Link to={"/register"}><button className="btn w-full">Register</button></Link>
        </div>
      </form>
        
    </div>
  );
}
