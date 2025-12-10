import React, { useEffect, useState } from "react";
import { User, Mail, Shield } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ProfileAPI } from "../../api";
import Loader from "../../components/Loader";
import formatText from "../../utils/formatText";

const MyProfile = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await ProfileAPI.getUserProfile();
        setUser(res.data.profile);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  //   console.log(user);

  return (
    <div
      className={`py-12 min-h-screen transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <h2
            className={`text-3xl font-bold mb-8 text-center transition ${
              theme ? "text-blue-600" : "text-blue-400"
            }`}
          >
            My Profile
          </h2>

          <div
            className={`rounded-xl p-6 border transition shadow-md ${
              theme
                ? "bg-white border-gray-300 hover:border-blue-300"
                : "bg-gray-800 border-gray-700 hover:border-blue-400"
            }`}
          >
            <div className="flex flex-col items-center">
              <img
                src={user?.avatar || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
              />

              <h3
                className={`text-xl font-semibold mt-4 transition ${
                  theme ? "text-gray-700" : "text-gray-100"
                }`}
              >
                {user?.name || "User Name"}
              </h3>

              <p
                className={`text-sm mt-1 transition ${
                  theme ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {formatText(user?.role) || "Not Specified"}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div
                className={`flex items-center gap-3 p-4 rounded-lg border transition ${
                  theme
                    ? "bg-gray-100 border-gray-300"
                    : "bg-gray-700 border-gray-600"
                }`}
              >
                <User size={20} className="text-blue-500" />
                <div>
                  <p
                    className={`text-sm ${
                      theme ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    Full Name
                  </p>
                  <p
                    className={`font-medium ${
                      theme ? "text-gray-800" : "text-gray-100"
                    }`}
                  >
                    {user?.name || "User Name"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-4 rounded-lg border transition ${
                  theme
                    ? "bg-gray-100 border-gray-300"
                    : "bg-gray-700 border-gray-600"
                }`}
              >
                <Mail size={20} className="text-blue-500" />
                <div>
                  <p
                    className={`text-sm ${
                      theme ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    Email Address
                  </p>
                  <p
                    className={`font-medium ${
                      theme ? "text-gray-800" : "text-gray-100"
                    }`}
                  >
                    {user?.email || "email@example.com"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-4 rounded-lg border transition ${
                  theme
                    ? "bg-gray-100 border-gray-300"
                    : "bg-gray-700 border-gray-600"
                }`}
              >
                <Shield size={20} className="text-blue-500" />
                <div>
                  <p
                    className={`text-sm ${
                      theme ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    Role
                  </p>
                  <p
                    className={`font-medium capitalize ${
                      theme ? "text-gray-800" : "text-gray-100"
                    }`}
                  >
                    {formatText(user?.role) || "student"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
