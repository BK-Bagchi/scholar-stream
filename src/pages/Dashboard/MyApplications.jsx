import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, DollarSign, Star, X } from "lucide-react";
import { toast } from "react-toastify";
import { useTheme } from "../../hooks/useTheme";
import { ApplicationAPI, PaymentAPI } from "../../api";
import Loader from "../../components/Loader";
import formatText from "../../utils/formatText";
import Modal from "../../components/Modal";
import ApplicationDetails from "./Components/ApplicationDetails";
import StudentReview from "./Components/StudentReview";

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

  const handleDeleteApplication = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmation) return;

    try {
      const res = await ApplicationAPI.deleteApplication(id);
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async (app) => {
    const confirmation = window.confirm("Are you sure you want to pay?");
    if (!confirmation) return;

    localStorage.setItem("scholarshipName", app.scholarshipId.scholarshipName);
    const data = {
      scholarshipId: app.scholarshipId._id,
      userId: app._id,
      userName: app.userName,
      userEmail: app.userEmail,
      universityName: app.universityName,
      scholarshipCategory: app.scholarshipCategory,
      degree: app.degree,
      applicationFees: app.applicationFees,
      serviceCharge: app.serviceCharge,
    };

    try {
      const res = await PaymentAPI.makePayment(data);

      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Payment error");
    }
  };

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
                  <th className="p-4">Application</th>
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
                          ? "border-gray-300 hover:bg-gray-100 text-gray-700"
                          : "border-gray-700 hover:bg-gray-700/40 text-gray-200"
                      }`}
                    >
                      <td className="p-4 font-medium">{app.universityName}</td>

                      <td className="p-4">{app.degree}</td>

                      <td className="p-4">{app.scholarshipCategory}</td>

                      <td className="p-4">
                        <div className="flex flex-col">
                          <span>
                            Tuition: <b>${app.tuitionFees}</b>
                          </span>
                          <span>
                            Application: <b>${app.applicationFees}</b>
                          </span>
                          <span>
                            Service: <b>${app.serviceCharge}</b>
                          </span>
                        </div>
                      </td>

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
                          {formatText(app.applicationStatus)}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            app.paymentStatus === "paid"
                              ? "bg-green-600/20 text-green-600"
                              : "bg-red-500/20 text-red-600"
                          }`}
                        >
                          {formatText(app.paymentStatus)}
                        </span>
                      </td>

                      <td className="p-4">
                        {new Date(app.applicationDate).toLocaleDateString()}
                      </td>

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

                        {app.applicationStatus === "pending" && (
                          <button className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600">
                            <Pencil size={16} /> Edit
                          </button>
                        )}

                        {app.applicationStatus === "pending" &&
                          app.paymentStatus === "unpaid" && (
                            <button
                              className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-green-500 text-white hover:bg-green-600"
                              onClick={() => handlePayment(app)}
                            >
                              <DollarSign size={16} /> Pay
                            </button>
                          )}

                        {app.applicationStatus === "pending" && (
                          <button
                            className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                            onClick={() => handleDeleteApplication(app._id)}
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        )}

                        {app.applicationStatus === "approved" && (
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setShowReviewModal(true);
                            }}
                            className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-purple-500 text-white hover:bg-purple-600"
                          >
                            <Star size={16} /> Review
                          </button>
                        )}
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
          <Modal
            setActiveModal={setShowDetailsModal}
            render={<ApplicationDetails selectedApp={selectedApp} />}
          />
        )}

        {/* ---------------------- REVIEW MODAL ---------------------- */}
        {showReviewModal && selectedApp && (
          <Modal
            setActiveModal={setShowReviewModal}
            render={<StudentReview {...{ selectedApp, setShowReviewModal }} />}
          />
        )}
      </div>
    </div>
  );
};

export default MyApplications;
