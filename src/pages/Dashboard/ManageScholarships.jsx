import React from "react";
import { Pencil, Trash2, School } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ManageScholarships = () => {
  const { theme } = useTheme();
  // Placeholder data
  const scholarships = [
    {
      id: 1,
      scholarshipName: "Global Excellence Scholarship",
      universityName: "Harvard University",
      category: "Full Fund",
      degree: "Masters",
      country: "USA",
    },
    {
      id: 2,
      scholarshipName: "STEM Innovation Award",
      universityName: "MIT",
      category: "Partial Fund",
      degree: "Bachelor",
      country: "USA",
    },
    {
      id: 3,
      scholarshipName: "Business Leaders Grant",
      universityName: "University of Toronto",
      category: "Self Fund",
      degree: "Diploma",
      country: "Canada",
    },
  ];

  return (
    <div
      className={`py-10 min-h-screen transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Title */}
        <h2
          className={`text-3xl font-bold mb-8 text-center transition ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Manage Scholarships
        </h2>

        {/* Table Container */}
        <div
          className={`overflow-x-auto rounded-xl border transition ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          <table className="w-full text-left">
            {/* Table Head */}
            <thead>
              <tr
                className={`text-sm ${
                  theme
                    ? "bg-gray-200 text-gray-700"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <th className="px-6 py-3">Scholarship Name</th>
                <th className="px-6 py-3">University</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Degree</th>
                <th className="px-6 py-3">Country</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {scholarships.map((sch) => (
                <tr
                  key={sch.id}
                  className={`border-t transition ${
                    theme
                      ? "border-gray-200 hover:bg-gray-100"
                      : "border-gray-700 hover:bg-gray-700/40"
                  }`}
                >
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <School
                      size={18}
                      className={theme ? "text-blue-600" : "text-blue-400"}
                    />
                    {sch.scholarshipName}
                  </td>
                  <td className="px-6 py-4">{sch.universityName}</td>
                  <td className="px-6 py-4">{sch.category}</td>
                  <td className="px-6 py-4">{sch.degree}</td>
                  <td className="px-6 py-4">{sch.country}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      {/* Update Button */}
                      <button
                        className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm transition ${
                          theme
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            : "bg-blue-900 text-blue-300 hover:bg-blue-800"
                        }`}
                      >
                        <Pencil size={16} />
                        Update
                      </button>

                      {/* Delete Button */}
                      <button
                        className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm transition ${
                          theme
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-red-900 text-red-300 hover:bg-red-800"
                        }`}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageScholarships;
