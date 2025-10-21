import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import Truck from "../assets/Truck.svg"
import { useTheme } from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token, role } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Determine dashboard path based on role
  const dashboardPath =
    role === "SENDER"
      ? "/sender"
      : role === "RECIVER"
      ? "/receiver"
      : role === "ADMIN"
      ? "/admin"
      : "/";

  return (
    <div>
     <div className="navbar bg-base-100 dark:bg-neutral text-black dark:text-white shadow-sm">
 
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/track">Contact</Link></li>
              {token && <li><Link to={dashboardPath}>Dashboard</Link></li>}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl"><img src={Truck} className="w-10"></img>ShipZone</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {token && <li><Link to={dashboardPath}>Dashboard</Link></li>}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2">
          <Link to='/track'><div className="btn hidden md:flex"><p>Track Parcel</p></div></Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>
          {!token ? (
            <>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn bg-[#039396de] text-white">Register</button>
            </Link>
            
            </>
          ) : (
            <button className="btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
