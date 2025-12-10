import React, { useEffect, useState } from "react";
import { Trash2, Star, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ReviewAPI } from "../../api";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const AllReviews = () => {
  const { theme } = useTheme();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await ReviewAPI.getReviews();
        setReviews(res.data.reviews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);
  console.log(reviews);

  const handleDelete = async (id) => {
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
          All Reviews
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition`}
          >
            {reviews.length > 0 ? (
              reviews.map((rev) => (
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
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <p
                        className={`font-semibold ${
                          theme ? "text-gray-800" : "text-gray-100"
                        }`}
                      >
                        {rev.userName}
                      </p>
                      <p
                        className={`text-sm ${
                          theme ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {rev.userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 flex gap-3 items-center">
                    <p
                      className={`text-sm font-semibold ${
                        theme ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Scholarship
                    </p>
                    <p
                      className={`text-sm ${
                        theme ? "text-gray-800" : "text-gray-200"
                      }`}
                    >
                      {rev.scholarshipId.scholarshipName || "N/A"}
                    </p>
                  </div>

                  <div className="mb-3 flex gap-3 items-center">
                    <p
                      className={`text-sm font-semibold ${
                        theme ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      University
                    </p>
                    <p
                      className={`text-sm ${
                        theme ? "text-gray-800" : "text-gray-200"
                      }`}
                    >
                      {rev.universityName}
                    </p>
                  </div>

                  <div className="mb-3 flex gap-3">
                    <p
                      className={`text-sm font-semibold ${
                        theme ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Comment
                    </p>
                    <p
                      className={`text-sm ${
                        theme ? "text-gray-800" : "text-gray-100"
                      }`}
                    >
                      {rev.reviewComment}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p
                      className={`text-sm ${
                        theme ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {new Date(rev.reviewDate).toLocaleDateString()}
                    </p>

                    <div className="flex items-center gap-1 text-yellow-400">
                      {rev.ratingPoint}
                      <Star size={16} />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleDelete(rev._id);
                    }}
                    className="mt-5 w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-400">
                No reviews found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
