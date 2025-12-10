import { useTheme } from "../../../hooks/useTheme";
import formatText from "../../../utils/formatText";

const formatDate = (isoDate) => {
  if (!isoDate) return "N/A";
  return isoDate.split("T")[0];
};

const ApplicationDetails = ({ selectedApp }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full max-w-lg rounded-xl p-6 border transition ${
        theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-xl font-semibold ${
            theme ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Application Details
        </h3>
      </div>

      {/* Details */}
      <div
        className={`space-y-3 text-sm ${
          theme ? "text-gray-700" : "text-gray-300"
        }`}
      >
        <p>
          <b>Applicant Name:</b> {selectedApp.userName}
        </p>
        <p>
          <b>Email:</b> {selectedApp.userEmail}
        </p>

        <hr className={theme ? "border-gray-300" : "border-gray-700"} />

        <p>
          <b>University:</b> {selectedApp.universityName}
        </p>
        <p>
          <b>Degree:</b> {selectedApp.degree}
        </p>
        <p>
          <b>Scholarship:</b> {selectedApp.scholarshipCategory}
        </p>
        <p>
          <b>Application Date:</b> {formatDate(selectedApp.applicationDate)}
        </p>

        <hr className={theme ? "border-gray-300" : "border-gray-700"} />
        <p>
          <b>Tuition Fees:</b> ${selectedApp.tuitionFees}
        </p>
        <p>
          <b>Application Fees:</b> ${selectedApp.applicationFees}
        </p>
        <p>
          <b>Service Charge:</b> ${selectedApp.serviceCharge}
        </p>
        <p>
          <b>Payment Status:</b>{" "}
          <span
            className={`px-2 py-1 rounded ${
              selectedApp.paymentStatus === "paid"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {formatText(selectedApp.paymentStatus)}
          </span>
        </p>

        <p>
          <b>Application Status:</b> {formatText(selectedApp.applicationStatus)}
        </p>

        <p>
          <b>Feedback:</b> {selectedApp.feedback || "No feedback yet"}
        </p>
      </div>
    </div>
  );
};

export default ApplicationDetails;
