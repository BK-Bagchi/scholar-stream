import React, { useState } from "react";
import { Trash2, Star, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const AllReviews = () => {
  const { theme } = useTheme();
  // Placeholder data
  const reviews = [
    {
      id: 1,
      scholarshipName: "Harvard Full Scholarship",
      universityName: "Harvard University",
      reviewerName: "John Doe",
      reviewerEmail: "john@example.com",
      reviewComment: "Excellent scholarship program!",
      reviewDate: "2024-11-12",
      ratingPoint: 5,
    },
    {
      id: 2,
      scholarshipName: "Toronto Engineering Scholarship",
      universityName: "University of Toronto",
      reviewerName: "Jane Smith",
      reviewerEmail: "jane@example.com",
      reviewComment: "Very competitive but fair process.",
      reviewDate: "2024-12-01",
      ratingPoint: 4,
    },
  ];

  const [selectedReview, setSelectedReview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

        <div
          className={`overflow-x-auto rounded-xl border transition ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          <table className="w-full">
            <thead
              className={`text-left text-sm ${
                theme
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              <tr>
                <th className="p-4">Scholarship</th>
                <th className="p-4">University</th>
                <th className="p-4">Reviewer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Date</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((rev) => (
                <tr
                  key={rev.id}
                  className={`text-sm border-t transition ${
                    theme
                      ? "border-gray-300 hover:bg-gray-100"
                      : "border-gray-700 hover:bg-gray-700/40"
                  }`}
                >
                  <td className="p-4">{rev.scholarshipName}</td>
                  <td className="p-4">{rev.universityName}</td>
                  <td className="p-4">{rev.reviewerName}</td>
                  <td className="p-4">{rev.reviewerEmail}</td>
                  <td className="p-4">{rev.reviewComment}</td>
                  <td className="p-4">{rev.reviewDate}</td>
                  <td className="p-4 flex items-center gap-1">
                    {rev.ratingPoint}
                    <Star size={16} className="text-yellow-400" />
                  </td>
                  <td className="p-4">
                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        setSelectedReview(rev);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 text-sm flex items-center gap-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------------------- DELETE MODAL ---------------------- */}
        {showDeleteModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div
              className={`w-full max-w-md rounded-xl p-6 border transition ${
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
                  Delete Review?
                </h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={22} />
                </button>
              </div>

              <p
                className={`text-sm mb-6 ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Are you sure you want to delete the review by{" "}
                <b>{selectedReview.reviewerName}</b> for{" "}
                <b>{selectedReview.scholarshipName}</b>?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>

                <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
