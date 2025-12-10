import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Star, X } from "lucide-react";
import { toast } from "react-toastify";
import { useTheme } from "../../hooks/useTheme";
import { ReviewAPI } from "../../api";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import StudentReviewEdit from "./Components/StudentReviewEdit";

const MyReviews = () => {
  const { theme } = useTheme();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await ReviewAPI.getUserReviews();
        setReviews(res.data.reviews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);
  // console.log(reviews);

  const [selectedReview, setSelectedReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteReview = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmation) return;
    try {
      const res = await ReviewAPI.deleteReview(id);
      toast.success(res.data.message);
      setReviews((prev) => prev.filter((rev) => rev._id !== id));
    } catch (error) {
      console.error(error);
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
          My Reviews
        </h2>

        {loading ? (
          <Loader />
        ) : reviews.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className={`rounded-xl p-5 border shadow-sm transition ${
                  theme
                    ? "bg-white border-gray-300 hover:shadow-md"
                    : "bg-gray-800 border-gray-700 hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={rev.userImage}
                    alt={rev.userName}
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                  <div>
                    <p
                      className={`font-medium ${
                        theme ? "text-gray-800" : "text-gray-100"
                      }`}
                    >
                      {rev.userName}
                    </p>
                    <p
                      className={`text-xs ${
                        theme ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {rev.userEmail}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm mb-1 ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <b>Scholarship:</b> {rev.scholarshipId.scholarshipName}
                </p>

                <p
                  className={`text-sm mb-1 ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <b>University:</b> {rev.universityName}
                </p>

                <p
                  className={`text-sm mb-2 ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <b>Review:</b> {rev.reviewComment}
                </p>

                <div className="flex items-center gap-1 mb-2">
                  <b>Rating:</b> {rev.ratingPoint}
                  <Star size={16} className="text-yellow-400" />
                </div>

                <p
                  className={`text-xs mb-4 ${
                    theme ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {new Date(rev.reviewDate).toLocaleDateString()}
                </p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => {
                      setSelectedReview(rev);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 rounded-md text-sm flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Pencil size={16} /> Edit
                  </button>

                  <button
                    onClick={() => {
                      handleDeleteReview(rev._id);
                    }}
                    className="px-3 py-1 rounded-md text-sm flex items-center gap-1 bg-red-600 text-white hover:bg-red-700"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`text-center py-10 ${
              theme ? "text-gray-600" : "text-gray-300"
            }`}
          >
            No reviews found.
          </p>
        )}

        {/* EDIT MODAL */}
        {showEditModal && selectedReview && (
          <Modal
            setActiveModal={setShowEditModal}
            render={
              <StudentReviewEdit
                {...{
                  setReviews,
                  selectedReview,
                  setShowEditModal,
                }}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default MyReviews;
