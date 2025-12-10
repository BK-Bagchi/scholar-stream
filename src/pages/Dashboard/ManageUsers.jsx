import { useEffect, useState } from "react";
import { UserCog, Trash2, ChevronDown, Shield } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { ProfileAPI } from "../../api";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import formatText from "../../utils/formatText";

export default function ManageUsers() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await ProfileAPI.getAllProfile();
        setUsers(res.data.profiles);
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers =
    filter === "All"
      ? users
      : users.filter((u) => u.role.toLowerCase() === filter.toLowerCase());

  const handleRoleChange = async (userId, newRole) => {
    if (user._id === userId) {
      toast.error("You cannot change your own role.");
      return;
    }

    const confirmation = window.confirm(
      `Are you sure you want to change the role for user to ${newRole}?`
    );
    if (!confirmation) return;

    try {
      const res = await ProfileAPI.updateProfileRole(userId, { role: newRole });
      toast.success(res.data.message);

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === userId) return { ...user, role: newRole };

          return user;
        })
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (user._id === userId) {
      toast.error("You cannot delete yourself.");
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmation) return;

    console.log("Deleting user:", userId);
    try {
      const res = await ProfileAPI.deleteProfile(userId);
      toast.success(res.data.message);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl min-h-screen transition ${
        theme ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={26} />
          Manage Users
        </h1>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`px-3 py-2 rounded-lg pr-8 appearance-none border focus:ring w-40 ${
              theme
                ? "bg-white text-gray-800 border-gray-300 focus:ring-blue-300"
                : "bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-600"
            }`}
          >
            <option>All</option>
            <option>Student</option>
            <option>Moderator</option>
            <option>Admin</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-3 pointer-events-none opacity-60"
          />
        </div>
      </div>

      {/* Table */}
      <div
        className={`overflow-hidden rounded-2xl shadow-md ${
          theme ? "bg-white" : "bg-gray-800"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <table className="w-full">
            <thead>
              <tr
                className={`text-left text-sm ${
                  theme
                    ? "bg-gray-100 text-gray-700"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Role</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-t ${
                      theme ? "border-gray-200" : "border-gray-700"
                    }`}
                  >
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 opacity-80">{user.email}</td>
                    <td className="py-3 px-4 font-semibold">
                      {formatText(user.role)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex gap-3 items-center">
                        {/* Change Role Dropdown */}
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition focus:outline-none ${
                            theme
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          <option value="student">Student</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>

                        {/* Delete User Button */}
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition ${
                            theme
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-4 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
