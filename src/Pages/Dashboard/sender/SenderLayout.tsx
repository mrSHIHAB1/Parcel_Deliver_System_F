import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { logout } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Toaster } from 'react-hot-toast';
export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/sender/dashboard" },
    { name: "Create Request", path: "/sender/create" },
    { name: "Cancel Parcel", path: "/sender/cancel" },
    {name: "ViewAll", path: "/sender/viewall" }
  ];
const dispatch = useDispatch();
const handleLogout = () => {
  dispatch(logout());
  navigate("/login");
};

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50`}
      >
     
        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6 dark:text-white">Sender Panel</h2>

        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                location.pathname === link.path
                  ? "bg-gray-300 dark:bg-gray-700 font-bold"
                  : "font-medium text-gray-800 dark:text-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

       
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-red-600 dark:text-red-400 font-semibold mt-4"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

     
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs bg-black/20 z-40 md:hidden"
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
          <h1 className="text-lg font-bold dark:text-white">Admin Panel</h1>
        </header>

     
        <main className="p-6">
            <Toaster />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
