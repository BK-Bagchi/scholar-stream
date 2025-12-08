import { useTheme } from "../../../hooks/useTheme";

const StudentReview = () => {
  const { theme } = useTheme();
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
          className={`w-full px-3 py-2 rounded-md border ${
            theme
              ? "bg-gray-100 border-gray-300 text-gray-800"
              : "bg-gray-700 border-gray-600 text-gray-100"
          }`}
        >
          <option>1 Star</option>
          <option>2 Stars</option>
          <option>3 Stars</option>
          <option>4 Stars</option>
          <option>5 Stars</option>
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
          className={`w-full px-3 py-2 rounded-md border resize-none ${
            theme
              ? "bg-gray-100 border-gray-300 text-gray-800"
              : "bg-gray-700 border-gray-600 text-gray-100"
          }`}
          placeholder="Write your review..."
        ></textarea>
      </div>

      <button className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
        Submit Review
      </button>
    </div>
  );
};

export default StudentReview;
