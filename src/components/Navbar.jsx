import { Link, NavLink } from "react-router-dom";
import { UserPlus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/useTheme";

const GeneralItems = ({ handleLogout, theme }) => (
  <>
    <ThemeToggle />
    <Link
      to="/login"
      onClick={handleLogout}
      className={`border ${theme ? "border-blue-600" : "border-blue-400"} ${
        theme ? "text-blue-600" : "text-blue-300"
      } px-4 py-2 rounded-md font-medium ${
        theme ? "hover:bg-blue-50" : "hover:bg-gray-700"
      } transition`}
    >
      Login
    </Link>
    <Link
      to="/register"
      className={`${
        theme
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white px-4 py-2 rounded-md font-medium transition`}
    >
      Register
    </Link>
  </>
);

const LoggedInItems = ({
  dropdownOpen,
  setDropdownOpen,
  user,
  handleLogout,
  theme,
}) => (
  <div className="flex md:flex-row flex-col md:items-center items-start gap-3 relative">
    <NavLink
      to="/my-connections"
      className={`font-medium ${
        theme
          ? "text-gray-700 hover:text-blue-600"
          : "text-gray-200 hover:text-blue-300"
      } transition`}
    >
      My Connections
    </NavLink>

    <Link
      to="/create-partner-profile"
      className={`flex items-center gap-1 ${
        theme
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white px-4 py-2 rounded-md font-medium transition`}
    >
      <UserPlus className="w-4 h-4" />
      Create Partner
    </Link>

    <ThemeToggle />

    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-1 border rounded-full p-1 focus:outline-none ${
          theme ? "border-gray-300" : "border-gray-600"
        }`}
      >
        <img
          src={user?.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <ChevronDown
          className={`w-4 h-4 ${theme ? "text-gray-700" : "text-gray-300"}`}
        />
      </button>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-2 w-40 border rounded-md shadow-lg py-1 z-50 ${
            theme ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
          }`}
        >
          <Link
            to="/profile"
            onClick={() => setDropdownOpen(false)}
            className={`block px-4 py-2 transition ${
              theme
                ? "text-gray-700 hover:bg-blue-50"
                : "text-gray-200 hover:bg-gray-700"
            }`}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full text-left px-4 py-2 transition ${
              theme
                ? "text-gray-700 hover:bg-red-100"
                : "text-gray-200 hover:bg-red-700"
            }`}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
);

const NavItems = ({ theme }) => (
  <>
    <li>
      <NavLink
        to="/"
        className={`font-medium transition ${
          theme
            ? "text-gray-700 hover:text-blue-600"
            : "text-gray-200 hover:text-blue-300"
        }`}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/find-partners"
        className={`font-medium transition ${
          theme
            ? "text-gray-700 hover:text-blue-600"
            : "text-gray-200 hover:text-blue-300"
        }`}
      >
        Find Partners
      </NavLink>
    </li>
  </>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => logout();

  return (
    <nav
      className={`border-b shadow-sm sticky top-0 z-50 ${
        theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
      }`}
    >
      <div className="max-w-[95%] mx-auto flex justify-between items-center px-4 py-3 md:px-8">
        <Link
          to="/"
          className={`text-2xl font-bold tracking-wide hover:opacity-90 ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          StudyMate
        </Link>

        <div className="md:hidden relative">
          <details className="dropdown">
            <summary className="list-none cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  theme ? "text-gray-700" : "text-gray-200"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </summary>
            <ul
              className={`absolute right-0 mt-3 border rounded-lg shadow-lg w-48 p-3 space-y-2 ${
                theme
                  ? "bg-white border-gray-200"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              <NavItems theme={theme} />
              <div className="flex flex-col gap-2 mt-2">
                {user ? (
                  <LoggedInItems
                    {...{
                      dropdownOpen,
                      setDropdownOpen,
                      user,
                      handleLogout,
                      theme,
                    }}
                  />
                ) : (
                  <GeneralItems handleLogout={handleLogout} theme={theme} />
                )}
              </div>
            </ul>
          </details>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 items-center">
            <NavItems theme={theme} />
          </ul>
          {user ? (
            <LoggedInItems
              {...{ dropdownOpen, setDropdownOpen, user, handleLogout, theme }}
            />
          ) : (
            <div className="flex items-center gap-3">
              <GeneralItems handleLogout={handleLogout} theme={theme} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
