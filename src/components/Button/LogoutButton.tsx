import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";
import { logout } from "../../features/auth/authSlice";

interface LogoutButtonProps {
  className?: string; 
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center px-4 py-2 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-red-600 dark:text-red-400 font-semibold ${className}`}
    >
      <LogOut className="w-5 h-5 mr-2" />
      Logout
    </button>
  );
}
