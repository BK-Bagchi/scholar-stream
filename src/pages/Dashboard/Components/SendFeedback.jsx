import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../../hooks/useTheme";
import { ApplicationAPI } from "../../../api";

const SendFeedback = ({
  selectedApp,
  setApplications,
  setShowFeedbackModal,
}) => {
  const { theme } = useTheme();

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    if (feedback.trim().length < 5) {
      setError("Feedback must be at least 5 characters long.");
      return;
    }
    selectedApp.feedback = feedback;
    // console.log("Feedback submitted:", selectedApp);

    try {
      const res = await ApplicationAPI.updateApplication(
        selectedApp._id,
        selectedApp
      );
      toast.success("Feedback submitted successfully!");
      setApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApp._id ? res.data.application : app
        )
      );
      setShowFeedbackModal(false);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
    setError("");
    setFeedback("");
  };

  return (
    <div
      className={`w-full max-w-lg rounded-xl p-6 border transition ${
        theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
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
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
        className={`w-full px-3 py-2 rounded-md border resize-none ${
          theme
            ? "bg-gray-100 border-gray-300 text-gray-800"
            : "bg-gray-700 border-gray-600 text-gray-100"
        }`}
        placeholder="Write your feedback..."
      ></textarea>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full py-2 mt-4 rounded-md bg-purple-600 text-white hover:bg-purple-700"
      >
        {submitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
};

export default SendFeedback;
