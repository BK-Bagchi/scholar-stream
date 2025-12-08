import React, { useEffect, useState } from "react";
import { Eye, Edit2, Trash2, MessageCircle, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ApplicationAPI } from "../../api";
import Loader from "../../components/Loader";
import formatText from "../../utils/formatText";
import ScholarshipDetails from "./Components/ScholarshipDetails";

const ManageApplications = () => {
  const { theme } = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await ApplicationAPI.getAllApplications();
        setApplications(res.data.applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);
  console.log(applications);

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
          {loading ? (
            <Loader />
          ) : (
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
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr
                      key={app._id}
                      className={`text-sm border-t transition ${
                        theme
                          ? "border-gray-300 hover:bg-gray-100"
                          : "border-gray-700 hover:bg-gray-700/40"
                      }`}
                    >
                      {/* Applicant Name */}
                      <td className="p-4">{app.userName}</td>

                      {/* Email */}
                      <td className="p-4">{app.userEmail}</td>

                      {/* University */}
                      <td className="p-4">{app.universityName}</td>

                      {/* Feedback */}
                      <td className="p-4">{app.feedback || "N/A"}</td>

                      {/* Application Status */}
                      <td className="p-4">
                        {formatText(app.applicationStatus)}
                      </td>

                      {/* Payment Status */}
                      <td className="p-4">{formatText(app.paymentStatus)}</td>

                      {/* Actions */}
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
                          <option value="approved">Approved</option>
                          <option className="hidden" value="rejected">
                            Rejected
                          </option>
                        </select>

                        {/* Cancel */}
                        <button
                          // onClick={() => handleDelete(app._id)}
                          className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          <Trash2 size={16} /> Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ---------------------- DETAILS MODAL ---------------------- */}
        {showDetailsModal && selectedApp && (
          <ScholarshipDetails
            selectedApp={selectedApp}
            setShowDetailsModal={setShowDetailsModal}
          />
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
