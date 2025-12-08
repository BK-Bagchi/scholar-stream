import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, DollarSign, Star, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ApplicationAPI } from "../../api";
import Loader from "../../components/Loader";

const MyApplications = () => {
  const { theme } = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await ApplicationAPI.getUserApplications();
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
                  <th className="p-4">University</th>
                  <th className="p-4">Degree</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Fees</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Applied</th>
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
                      {/* University Name */}
                      <td className="p-4 font-medium">{app.universityName}</td>

                      {/* Degree */}
                      <td className="p-4">{app.degree}</td>

                      {/* Scholarship Category */}
                      <td className="p-4">{app.scholarshipCategory}</td>

                      {/* Fees */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span>
                            App Fee: <b>${app.applicationFees}</b>
                          </span>
                          <span>
                            Service: <b>${app.serviceCharge}</b>
                          </span>
                        </div>
                      </td>

                      {/* Application Status */}
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            app.applicationStatus === "approved"
                              ? "bg-green-500/20 text-green-600"
                              : app.applicationStatus === "rejected"
                              ? "bg-red-500/20 text-red-600"
                              : "bg-yellow-500/20 text-yellow-600"
                          }`}
                        >
                          {app.applicationStatus}
                        </span>
                      </td>

                      {/* Payment Status */}
                      <td className="p-4 capitalize">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            app.paymentStatus === "paid"
                              ? "bg-green-600/20 text-green-600"
                              : "bg-red-500/20 text-red-600"
                          }`}
                        >
                          {app.paymentStatus}
                        </span>
                      </td>

                      {/* Application Date */}
                      <td className="p-4">
                        {new Date(app.applicationDate).toLocaleDateString()}
                      </td>

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

                        {/* Edit */}
                        <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600">
                          <Pencil size={16} /> Edit
                        </button>

                        {/* Pay */}
                        {app.paymentStatus === "unpaid" && (
                          <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-green-500 text-white hover:bg-green-600">
                            <DollarSign size={16} /> Pay
                          </button>
                        )}

                        {/* Delete */}
                        <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-red-500 text-white hover:bg-red-600">
                          <Trash2 size={16} /> Delete
                        </button>

                        {/* Review */}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center">
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
