import React from "react";
import { PlusCircle } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const AddScholarship = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`py-10 min-h-screen transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-10 text-center ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Add New Scholarship
        </h2>

        <form
          className={`p-8 rounded-xl border transition ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          {/* --- Grid Inputs --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scholarship Name */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Scholarship Name
              </label>
              <input
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="Enter scholarship name"
              />
            </div>

            {/* University Name */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                University Name
              </label>
              <input
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="Enter university name"
              />
            </div>

            {/* University Image */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                University Image URL
              </label>
              <input
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Country */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Country
              </label>
              <input
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="Country"
              />
            </div>

            {/* City */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                City
              </label>
              <input
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="City"
              />
            </div>

            {/* World Rank */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                University World Rank
              </label>
              <input
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="125"
              />
            </div>

            {/* Subject Category */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Subject Category
              </label>
              <input
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="Science / Engineering / Business"
              />
            </div>

            {/* Scholarship Category */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Scholarship Category
              </label>
              <select
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              >
                <option value="">Select</option>
                <option value="Full Fund">Full Fund</option>
                <option value="Partial Fund">Partial Fund</option>
                <option value="Self Fund">Self Fund</option>
              </select>
            </div>

            {/* Degree */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Degree
              </label>
              <select
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              >
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            {/* Tuition Fees */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Tuition Fees (Optional)
              </label>
              <input
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
                placeholder="0"
              />
            </div>

            {/* Application Fees */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Application Fees
              </label>
              <input
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
                placeholder="50"
              />
            </div>

            {/* Service Charge */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Service Charge
              </label>
              <input
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
                placeholder="20"
              />
            </div>

            {/* Deadline */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Application Deadline
              </label>
              <input
                type="date"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              />
            </div>

            {/* Post Date */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Post Date
              </label>
              <input
                type="date"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              />
            </div>

            {/* Posted User Email */}
            <div className="md:col-span-2">
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Posted User Email
              </label>
              <input
                type="email"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              <PlusCircle size={20} /> Add Scholarship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
