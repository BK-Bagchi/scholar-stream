import { CheckCircle2 } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const PaymentSuccess = ({
  scholarshipName = "My Scholarship",
  universityName = "My University",
  amount = 1000,
}) => {
  const { theme } = useTheme();

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
          <CheckCircle2
            className={`w-14 h-14 ${
              theme ? "text-tealGreen" : "text-tealGreen"
            }`}
          />

          <h1
            className={`text-3xl font-bold ${
              theme ? "text-electricBlue" : "text-electricBlue"
            }`}
          >
            Payment Successful
          </h1>

          <p className={`text-gray-500 max-w-sm`}>
            Your payment has been processed successfully. Below are your
            transaction details.
          </p>
        </div>

        {/* Details Section */}
        <div
          className={`mt-6 p-5 rounded-xl border transition ${
            theme ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Scholarship Details</h2>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Scholarship:</span>
              <span className="font-semibold">{scholarshipName}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-600">University:</span>
              <span className="font-semibold">{universityName}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Amount Paid:</span>
              <span
                className={`font-bold ${
                  theme ? "text-vibrantPurple" : "text-vibrantPurple"
                }`}
              >
                ${amount}
              </span>
            </div>
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
          >
            Go to My Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
