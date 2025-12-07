import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ScholarshipDetails = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Placeholder scholarship data
  const scholarship = {
    id: 1,
    name: "Stanford Global Excellence Scholarship",
    university: "Stanford University",
    worldRank: 3,
    deadline: "March 20, 2025",
    location: "California, USA",
    fee: 50,
    stipend: "$2000 / month + accommodation",
    description:
      "The Stanford Global Excellence Scholarship is awarded to outstanding international students who demonstrate exceptional academic merit and leadership potential.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Stanford_University_campus_from_above.jpg",
  };

  // Placeholder reviews
  const reviews = [
    {
      id: 1,
      reviewer: "John Carter",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Feb 10, 2025",
      rating: 5,
      comment:
        "Amazing scholarship opportunity! The stipend and campus support are excellent.",
    },
    {
      id: 2,
      reviewer: "Emma Watson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "Jan 25, 2025",
      rating: 4,
      comment:
        "Great experience overall, but the application process was competitive.",
    },
  ];

  return (
    <div className={`py-12 transition ${theme ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <h2
          className={`text-3xl font-bold mb-8 text-center transition ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Scholarship Details
        </h2>

        {/* Main Card */}
        <div
          className={`rounded-xl p-6 border mb-10 transition shadow-sm ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          {/* Image */}
          <img
            src={scholarship.image}
            alt={scholarship.university}
            className="rounded-lg w-full h-64 object-cover mb-6"
          />

          {/* Title */}
          <h3
            className={`text-2xl font-bold mb-2 ${
              theme ? "text-gray-900" : "text-white"
            }`}
          >
            {scholarship.name}
          </h3>

          {/* University */}
          <p
            className={`text-lg mb-3 ${
              theme ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {scholarship.university}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              🌍 <span className="font-semibold">World Rank:</span>{" "}
              {scholarship.worldRank}
            </p>

            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              📅 <span className="font-semibold">Deadline:</span>{" "}
              {scholarship.deadline}
            </p>

            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              📍 <span className="font-semibold">Location:</span>{" "}
              {scholarship.location}
            </p>

            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              💵 <span className="font-semibold">Application Fee:</span>{" "}
              {scholarship.fee > 0 ? `$${scholarship.fee}` : "Free"}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4
              className={`text-lg font-semibold mb-2 ${
                theme ? "text-gray-900" : "text-white"
              }`}
            >
              Scholarship Description
            </h4>
            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              {scholarship.description}
            </p>
          </div>

          {/* Stipend */}
          <div className="mb-6">
            <h4
              className={`text-lg font-semibold mb-2 ${
                theme ? "text-gray-900" : "text-white"
              }`}
            >
              Coverage / Stipend
            </h4>
            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              {scholarship.stipend}
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => navigate(`/checkout/${scholarship.id}`)}
            className={`w-full py-3 text-center mt-4 rounded-lg font-semibold transition ${
              theme
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Apply for Scholarship
          </button>
        </div>

        {/* Reviews Section */}
        <div
          className={`rounded-xl p-6 border transition shadow-sm ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              theme ? "text-gray-900" : "text-white"
            }`}
          >
            Reviews
          </h3>

          {reviews.length === 0 ? (
            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              No reviews yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-4 rounded-lg border transition ${
                    theme
                      ? "bg-white border-gray-300 hover:border-blue-300"
                      : "bg-gray-800 border-gray-700 hover:border-blue-400"
                  }`}
                >
                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={rev.avatar}
                      alt={rev.reviewer}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p
                        className={`font-semibold ${
                          theme ? "text-gray-900" : "text-white"
                        }`}
                      >
                        {rev.reviewer}
                      </p>
                      <p
                        className={`text-sm ${
                          theme ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {rev.date}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
