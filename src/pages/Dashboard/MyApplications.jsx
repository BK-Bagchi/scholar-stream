import React, { useState } from "react";
import { Eye, Pencil, Trash2, DollarSign, Star, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const MyApplications = () => {
  const { theme } = useTheme();
  // Placeholder sample data
  const applications = [
    {
      id: 1,
      universityName: "Harvard University",
      universityAddress: "Cambridge, USA",
      feedback: "Pending review",
      subjectCategory: "Computer Science",
      applicationFees: "$100",
      applicationStatus: "pending",
      paymentStatus: "unpaid",
    },
    {
      id: 2,
      universityName: "University of Toronto",
      universityAddress: "Toronto, Canada",
      feedback: "Excellent profile!",
      subjectCategory: "Engineering",
      applicationFees: "$80",
      applicationStatus: "completed",
      paymentStatus: "paid",
    },
  ];

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div
      className={`py-10 min-h-screen transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-8 text-center ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          My Applications
        </h2>

        <div
          className={`overflow-x-auto rounded-xl border transition ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          <table className="w-full">
            <thead
              className={`text-left text-sm ${
                theme
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              <tr>
                <th className="p-4">University Name</th>
                <th className="p-4">Address</th>
                <th className="p-4">Feedback</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Fees</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className={`text-sm border-t transition ${
                    theme
                      ? "border-gray-300 hover:bg-gray-100"
                      : "border-gray-700 hover:bg-gray-700/40"
                  }`}
                >
                  <td className="p-4">{app.universityName}</td>
                  <td className="p-4">{app.universityAddress}</td>
                  <td className="p-4">{app.feedback}</td>
                  <td className="p-4">{app.subjectCategory}</td>
                  <td className="p-4">{app.applicationFees}</td>
                  <td className="p-4 capitalize">{app.applicationStatus}</td>

                  <td className="p-4 flex gap-2 flex-wrap">
                    {/* Details */}
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowDetailsModal(true);
                      }}
                      className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Eye size={16} /> Details
                    </button>

                    {/* Edit */}
                    <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600">
                      <Pencil size={16} /> Edit
                    </button>

                    {/* Pay */}
                    <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-green-500 text-white hover:bg-green-600">
                      <DollarSign size={16} /> Pay
                    </button>

                    {/* Delete */}
                    <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-red-500 text-white hover:bg-red-600">
                      <Trash2 size={16} /> Delete
                    </button>

                    {/* Add Review */}
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowReviewModal(true);
                      }}
                      className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-purple-500 text-white hover:bg-purple-600"
                    >
                      <Star size={16} /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------------------- DETAILS MODAL ---------------------- */}
        {showDetailsModal && selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div
              className={`w-full max-w-lg rounded-xl p-6 border transition ${
                theme
                  ? "bg-white border-gray-300"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-xl font-semibold ${
                    theme ? "text-gray-800" : "text-gray-100"
                  }`}
                >
                  Application Details
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={22} />
                </button>
              </div>

              <div
                className={`space-y-2 text-sm ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <p>
                  <b>University:</b> {selectedApp.universityName}
                </p>
                <p>
                  <b>Address:</b> {selectedApp.universityAddress}
                </p>
                <p>
                  <b>Subject:</b> {selectedApp.subjectCategory}
                </p>
                <p>
                  <b>Application Fees:</b> {selectedApp.applicationFees}
                </p>
                <p>
                  <b>Status:</b> {selectedApp.applicationStatus}
                </p>
                <p>
                  <b>Feedback:</b> {selectedApp.feedback}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------- REVIEW MODAL ---------------------- */}
        {showReviewModal && selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div
              className={`w-full max-w-lg rounded-xl p-6 border transition ${
                theme
                  ? "bg-white border-gray-300"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-xl font-semibold ${
                    theme ? "text-gray-800" : "text-gray-100"
                  }`}
                >
                  Add Review
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <p
                  className={`text-sm mb-2 ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Rating (1–5 Stars)
                </p>
                <select
                  className={`w-full px-3 py-2 rounded-md border ${
                    theme
                      ? "bg-gray-100 border-gray-300 text-gray-800"
                      : "bg-gray-700 border-gray-600 text-gray-100"
                  }`}
                >
                  <option>1 Star</option>
                  <option>2 Stars</option>
                  <option>3 Stars</option>
                  <option>4 Stars</option>
                  <option>5 Stars</option>
                </select>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <p
                  className={`text-sm mb-2 ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Comment
                </p>
                <textarea
                  rows={4}
                  className={`w-full px-3 py-2 rounded-md border resize-none ${
                    theme
                      ? "bg-gray-100 border-gray-300 text-gray-800"
                      : "bg-gray-700 border-gray-600 text-gray-100"
                  }`}
                  placeholder="Write your review..."
                ></textarea>
              </div>

              <button className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
