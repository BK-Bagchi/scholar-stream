import React, { useState } from "react";
import { Eye, Edit2, Trash2, MessageCircle, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ManageApplications = () => {
  const { theme } = useTheme();
  // Placeholder data
  const applications = [
    {
      id: 1,
      applicantName: "John Doe",
      applicantEmail: "john@example.com",
      universityName: "Harvard University",
      feedback: "Pending review",
      applicationStatus: "pending",
      paymentStatus: "unpaid",
    },
    {
      id: 2,
      applicantName: "Jane Smith",
      applicantEmail: "jane@example.com",
      universityName: "University of Toronto",
      feedback: "Good profile",
      applicationStatus: "completed",
      paymentStatus: "paid",
    },
  ];

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <div
      className={`py-10 min-h-screen transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-8 text-center ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Manage Applied Applications
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
                <th className="p-4">Applicant Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">University</th>
                <th className="p-4">Feedback</th>
                <th className="p-4">Application Status</th>
                <th className="p-4">Payment Status</th>
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
                  <td className="p-4">{app.applicantName}</td>
                  <td className="p-4">{app.applicantEmail}</td>
                  <td className="p-4">{app.universityName}</td>
                  <td className="p-4">{app.feedback}</td>
                  <td className="p-4 capitalize">{app.applicationStatus}</td>
                  <td className="p-4 capitalize">{app.paymentStatus}</td>
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

                    {/* Feedback */}
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowFeedbackModal(true);
                      }}
                      className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-purple-500 text-white hover:bg-purple-600"
                    >
                      <MessageCircle size={16} /> Feedback
                    </button>

                    {/* Status Update */}
                    <select
                      defaultValue={app.applicationStatus}
                      className={`px-2 py-1 rounded-md border text-sm ${
                        theme
                          ? "bg-gray-100 border-gray-300 text-gray-800"
                          : "bg-gray-700 border-gray-600 text-gray-100"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    {/* Cancel */}
                    <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-red-500 text-white hover:bg-red-600">
                      <Trash2 size={16} /> Cancel
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
                  <b>Applicant Name:</b> {selectedApp.applicantName}
                </p>
                <p>
                  <b>Email:</b> {selectedApp.applicantEmail}
                </p>
                <p>
                  <b>University:</b> {selectedApp.universityName}
                </p>
                <p>
                  <b>Feedback:</b> {selectedApp.feedback}
                </p>
                <p>
                  <b>Application Status:</b> {selectedApp.applicationStatus}
                </p>
                <p>
                  <b>Payment Status:</b> {selectedApp.paymentStatus}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------- FEEDBACK MODAL ---------------------- */}
        {showFeedbackModal && selectedApp && (
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
                  Write Feedback
                </h3>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={22} />
                </button>
              </div>

              <textarea
                rows={4}
                className={`w-full px-3 py-2 rounded-md border resize-none ${
                  theme
                    ? "bg-gray-100 border-gray-300 text-gray-800"
                    : "bg-gray-700 border-gray-600 text-gray-100"
                }`}
                placeholder="Write your feedback..."
              ></textarea>

              <button className="w-full py-2 mt-4 rounded-md bg-purple-600 text-white hover:bg-purple-700">
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
