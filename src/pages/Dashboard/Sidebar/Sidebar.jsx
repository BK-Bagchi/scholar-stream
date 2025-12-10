import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//prettier-ignore
import { adminSidebarLinks, moderatorSidebarLinks, studentSidebarLinks, } from "./sidebarLinks";
import Avatar from "../../../assets/Default_Avatar.jpeg";
import { useAuth } from "../../../hooks/useAuth";
import formatText from "../../../utils/formatText";

const Sidebar = ({ theme }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(user);

  const { name: userName, role: userRole, photoURL: userAvatar } = user || {};
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname.includes("logout")) return logout();
    setActiveRoute(location.pathname);
  }, [location, logout]);

  const getRoleLinks = () => {
    if (userRole === "admin") return adminSidebarLinks;
    if (userRole === "moderator") return moderatorSidebarLinks;
    return studentSidebarLinks;
  };
  // console.log(userRole);

  const roleLinks = getRoleLinks();

  return (
    <aside
      className={`flex flex-col justify-between h-screen w-full px-3 py-6 transition-all 
      ${
        theme
          ? "bg-white text-gray-800 border-r border-gray-200"
          : "bg-gray-900 text-white border-r border-gray-700"
      }`}
    >
      <div>
        <div
          className={`flex items-center gap-3 px-3 py-2 my-4 rounded-md cursor-pointer transition border
          ${
            theme
              ? "bg-white border-gray-200 hover:shadow-md hover:border-blue-200"
              : "bg-gray-800 border-gray-700 hover:shadow-md hover:border-blue-400"
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <div className="flex items-center justify-center">
            <img
              className="rounded-full w-10 h-10"
              src={userAvatar || Avatar}
              alt={userName}
            />
          </div>

          <div className="flex flex-col">
            <span
              className={`text-sm font-semibold ${
                theme ? "text-gray-900" : "text-white"
              }`}
            >
              {userName}
            </span>

            <span className="text-xs text-gray-400">
              {formatText(userRole)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {roleLinks.map((link) => (
            <Link
              key={link.name}
              to={link.route}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm border transition
              ${
                theme
                  ? "bg-white border-gray-200 hover:shadow-md hover:border-blue-200 hover:text-blue-600"
                  : "bg-gray-800 border-gray-700 hover:shadow-md hover:border-blue-400 hover:text-blue-300"
              }
              ${
                activeRoute === link.route
                  ? theme
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-blue-900 border-blue-500 text-blue-300"
                  : ""
              }
              `}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
