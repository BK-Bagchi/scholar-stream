import { XCircle } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const scholarshipName = localStorage.getItem("scholarshipName");

  return (
    <div
      className={`min-h-[80vh] flex items-center justify-center px-4 transition-colors ${
        theme ? "bg-softWhite" : "bg-charcoalGray"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-2xl shadow-lg transition-all ${
          theme ? "bg-white text-gray-800" : "bg-gray-900 text-gray-200"
        }`}
      >
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <XCircle
            className={`w-14 h-14 ${theme ? "text-red-500" : "text-red-400"}`}
          />

          <h1
            className={`text-3xl font-bold ${
              theme ? "text-vibrantPurple" : "text-vibrantPurple"
            }`}
          >
            Payment Failed
          </h1>

          <p className="text-gray-500 max-w-sm">
            Unfortunately, your payment could not be completed. Please review
            the details below.
          </p>
        </div>

        {/* Details Section */}
        <div
          className={`mt-6 p-5 rounded-xl border transition ${
            theme ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Scholarship Details</h2>

          <div className="flex justify-between text-sm mb-3">
            <span className="font-medium text-gray-600">Scholarship:</span>
            <span className="font-semibold">{scholarshipName || "N/A"}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            className={`w-full py-3 rounded-xl font-semibold transition-all shadow-md
              ${
                theme
                  ? "bg-electricBlue text-white hover:bg-vibrantPurple"
                  : "bg-electricBlue text-white hover:bg-vibrantPurple"
              }`}
            onClick={() => navigate("/dashboard")}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
