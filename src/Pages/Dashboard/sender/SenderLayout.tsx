import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { logout } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../../assets/Profile.svg"

import type { RootState } from "../../../app/store";


export default function SenderLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const links = [
    { name: "Dashboard", path: "/sender/dashboard" },
    { name: "Create Request", path: "/sender/create" },
    { name: "View All Parcels", path: "/sender/viewall" },
    { name: "Tracking", path: "/sender/track" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
   
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 p-4 flex flex-col transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50 shadow-lg`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
       
            <img
              src={user?.avatar || Profile}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-800 dark:text-gray-100 font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
            </div>
          </div>
        
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                location.pathname === link.path
                  ? "bg-teal-100 dark:bg-teal-700 font-bold text-teal-800 dark:text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-700 transition-colors text-red-600 dark:text-red-400 font-semibold mt-4"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

     
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
  
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md md:hidden">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-lg font-bold dark:text-white">Sender Panel</h1>
        </header>

        <main className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
         
          <Outlet />
        </main>
      </div>
    </div>
  );
}
