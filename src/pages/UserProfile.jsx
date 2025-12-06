import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import Avatar from "../assets/Default_Avatar.jpeg";
import { ProfileAPI } from "../api";
import Loader from "../components/Loader";

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const { theme } = useTheme();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await ProfileAPI.getProfileById(userId);
        setUser(res.data.profile);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);
  //   console.log(user);

  return (
    <div
      className={`py-40 min-h-[65vh] transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row transition ${
              theme ? "bg-white" : "bg-gray-800"
            }`}
          >
            <div className="md:w-1/3 w-full">
              <img
                src={user.avatar || Avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
              <div>
                <h2
                  className={`text-3xl font-bold mb-2 transition ${
                    theme ? "text-gray-800" : "text-gray-100"
                  }`}
                >
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span
                    className={`font-medium transition ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {user.rating}
                  </span>
                </div>

                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Study Mode: </span>
                  Online
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Partner Count:</span>{" "}
                  {user.partnerCount}
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Rating:</span> {user.rating}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
