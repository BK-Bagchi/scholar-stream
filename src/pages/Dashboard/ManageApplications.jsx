import React, { useEffect, useState } from "react";
import { Eye, Edit2, Trash2, MessageCircle, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ApplicationAPI } from "../../api";
import Loader from "../../components/Loader";
import formatText from "../../utils/formatText";
import Modal from "../../components/Modal";
import ScholarshipDetails from "./Components/ScholarshipDetails";
import SendFeedback from "./Components/SendFeedback";
import { toast } from "react-toastify";

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
  // console.log(applications);

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleStatusUpdate = async (id, status) => {
    const confirmation = window.confirm(
      "Are you sure you want to update the status?"
    );
    if (!confirmation) return;

    try {
      const res = await ApplicationAPI.updateApplicationStatus(id, { status });
      toast.success(res.data.message);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? res.data.application : app))
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleRejectApplication = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to reject this application?"
    );
    if (!confirmation) return;

    try {
      const res = await ApplicationAPI.updateApplicationStatus(id, {
        status: "rejected",
      });
      toast.success(res.data.message);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? res.data.application : app))
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

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
                          ? "border-gray-300 hover:bg-gray-100 text-gray-700"
                          : "border-gray-700 hover:bg-gray-700/40 text-gray-200"
                      }`}
                    >
                      <td className="p-4">{app.userName}</td>

                      <td className="p-4">{app.userEmail}</td>

                      <td className="p-4">{app.universityName}</td>

                      <td className="p-4">{app.feedback || "N/A"}</td>

                      <td className="p-4">
                        {formatText(app.applicationStatus)}
                      </td>

                      <td className="p-4">{formatText(app.paymentStatus)}</td>

                      <td className="p-4 flex gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowDetailsModal(true);
                          }}
                          className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                          <Eye size={16} /> Details
                        </button>

                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowFeedbackModal(true);
                          }}
                          className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-purple-500 text-white hover:bg-purple-600"
                        >
                          <MessageCircle size={16} /> Feedback
                        </button>

                        <select
                          defaultValue={app.applicationStatus}
                          onChange={(e) =>
                            handleStatusUpdate(app._id, e.target.value)
                          }
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

                        <button
                          disabled={app.applicationStatus === "rejected"}
                          onClick={() => handleRejectApplication(app._id)}
                          className={`px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed`}
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
          <Modal
            setActiveModal={setShowDetailsModal}
            render={<ScholarshipDetails selectedApp={selectedApp} />}
          />
        )}

        {/* ---------------------- FEEDBACK MODAL ---------------------- */}
        {showFeedbackModal && selectedApp && (
          <Modal
            setActiveModal={setShowFeedbackModal}
            render={
              <SendFeedback
                {...{ selectedApp, setApplications, setShowFeedbackModal }}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
