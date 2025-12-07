import { useState } from "react";
import { UserCog, Trash2, ChevronDown, Shield } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ManageUsers() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("All");

  // Placeholder users
  const users = [
    { id: 1, name: "Ayan Das", email: "ayan@example.com", role: "Student" },
    { id: 2, name: "Rima Khan", email: "rima@example.com", role: "Moderator" },
    { id: 3, name: "Admin Rahim", email: "rahim@example.com", role: "Admin" },
  ];

  const filteredUsers =
    filter === "All"
      ? users
      : users.filter((u) => u.role.toLowerCase() === filter.toLowerCase());

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
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`border-t ${
                  theme ? "border-gray-200" : "border-gray-700"
                }`}
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4 opacity-80">{user.email}</td>
                <td className="py-3 px-4 font-semibold">{user.role}</td>

                <td className="py-3 px-4">
                  <div className="flex gap-3">
                    {/* Change Role btn */}
                    <button
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition ${
                        theme
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <UserCog size={16} /> Change Role
                    </button>

                    {/* Delete User btn */}
                    <button
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
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center py-6 opacity-70">No users found.</p>
        )}
      </div>
    </div>
  );
}
