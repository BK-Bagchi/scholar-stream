import formatText from "../../../utils/formatText";
import { useTheme } from "../../../hooks/useTheme";

const ScholarshipDetails = ({ selectedApp }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full max-w-lg rounded-2xl p-6 border shadow-lg transition ${
        theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-2xl font-bold ${
            theme ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Application Details
        </h3>
      </div>

      {/* Details Section */}
      <div className="space-y-4 text-sm">
        {/* Applicant Info */}
        <div>
          <h4
            className={`font-semibold mb-1 ${
              theme ? "text-gray-900" : "text-gray-200"
            }`}
          >
            Applicant Information
          </h4>
          <div
            className={`space-y-1 ${theme ? "text-gray-700" : "text-gray-300"}`}
          >
            <p>
              <b>Name:</b> {selectedApp.userName}
            </p>
            <p>
              <b>Email:</b> {selectedApp.userEmail}
            </p>
          </div>
        </div>

        {/* University Info */}
        <div>
          <h4
            className={`font-semibold mb-1 ${
              theme ? "text-gray-900" : "text-gray-200"
            }`}
          >
            University Details
          </h4>
          <div
            className={`space-y-1 ${theme ? "text-gray-700" : "text-gray-300"}`}
          >
            <p>
              <b>University:</b> {selectedApp.universityName}
            </p>
            <p>
              <b>Scholarship Category:</b> {selectedApp.scholarshipCategory}
            </p>
            <p>
              <b>Degree:</b> {selectedApp.degree}
            </p>
          </div>
        </div>

        {/* Fees Section */}
        <div>
          <h4
            className={`font-semibold mb-1 ${
              theme ? "text-gray-900" : "text-gray-200"
            }`}
          >
            Fees & Charges
          </h4>
          <div
            className={`space-y-1 ${theme ? "text-gray-700" : "text-gray-300"}`}
          >
            <p>
              <b>Application Fees:</b> ${selectedApp.applicationFees}
            </p>
            <p>
              <b>Service Charge:</b> ${selectedApp.serviceCharge}
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div>
          <h4
            className={`font-semibold mb-1 ${
              theme ? "text-gray-900" : "text-gray-200"
            }`}
          >
            Status Information
          </h4>
          <div
            className={`space-y-1 ${theme ? "text-gray-700" : "text-gray-300"}`}
          >
            <p>
              <b>Application Status:</b>{" "}
              {formatText(selectedApp.applicationStatus)}
            </p>
            <p>
              <b>Payment Status:</b> {formatText(selectedApp.paymentStatus)}
            </p>
            <p>
              <b>Applied On:</b>{" "}
              {new Date(selectedApp.applicationDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Feedback */}
        <div>
          <h4
            className={`font-semibold mb-1 ${
              theme ? "text-gray-900" : "text-gray-200"
            }`}
          >
            Feedback
          </h4>
          <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
            {selectedApp.feedback || "No feedback provided yet."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
