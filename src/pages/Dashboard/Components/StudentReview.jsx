import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../../hooks/useTheme";
import { useAuth } from "../../../hooks/useAuth";
import { ReviewAPI } from "../../../api";

const StudentReview = ({ selectedApp, setShowReviewModal }) => {
  //   console.log(selectedApp);
  const { theme } = useTheme();
  const { user } = useAuth();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    if (comment.trim().length < 5) {
      setError("Review must be at least 5 characters long.");
      return;
    }
    setError("");

    const reviewData = {
      scholarshipId: selectedApp.scholarshipId,
      universityName: selectedApp.universityName,
      userName: user.name,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint: rating,
      reviewComment: comment,
    };

    // console.log("Review Submitted:", reviewData);
    try {
      const res = await ReviewAPI.addReview(reviewData);
      toast.success(res.data.message);
      setShowReviewModal(false);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
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
          Add Review
        </h3>
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
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className={`w-full px-3 py-2 rounded-md border ${
            theme
              ? "bg-gray-100 border-gray-300 text-gray-800"
              : "bg-gray-700 border-gray-600 text-gray-100"
          }`}
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border resize-none ${
            theme
              ? "bg-gray-100 border-gray-300 text-gray-800"
              : "bg-gray-700 border-gray-600 text-gray-100"
          }`}
          placeholder="Write your review..."
        ></textarea>

        {/* Validation Error */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default StudentReview;
