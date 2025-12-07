import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
// import Loader from "../components/Loader";

const AllScholarships = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  // const [loading, setLoading] = useState(true);
  const placeholderScholarships = [
    {
      id: 1,
      university: "Stanford University",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Stanford_University_campus_from_above.jpg",
      category: "Full Scholarship",
      location: "California, USA",
      fee: 50,
    },
    {
      id: 2,
      university: "University of Toronto",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      category: "Merit-Based",
      location: "Toronto, Canada",
      fee: 30,
    },
    {
      id: 3,
      university: "University of Sydney",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      category: "Partial Scholarship",
      location: "Sydney, Australia",
      fee: 20,
    },
    {
      id: 4,
      university: "ETH Zurich",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      category: "Research Scholarship",
      location: "Zurich, Switzerland",
      fee: 0,
    },
  ];

  return (
    <div className={`py-12 transition ${theme ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-8 text-center transition ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Explore Scholarships
        </h2>

        {/* 🔍 Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {/* Select (kept exactly same as your code) */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`px-4 py-2 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 transition ${
              theme
                ? "text-gray-700 border border-gray-500 focus:ring-blue-400 bg-white"
                : "text-gray-100 border border-gray-600 focus:ring-blue-400 bg-gray-800"
            }`}
          >
            <option className="hidden" value="">
              Sort by Category
            </option>
            <option value="Full">Full Scholarship</option>
            <option value="Partial">Partial Scholarship</option>
            <option value="Merit">Merit Based</option>
          </select>

          {/* Input (kept same) */}
          <input
            type="text"
            placeholder="Search scholarship..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-4 py-2 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 transition ${
              theme
                ? "text-gray-700 border border-gray-500 focus:ring-blue-400 bg-white"
                : "text-gray-100 border border-gray-600 focus:ring-blue-400 bg-gray-800"
            }`}
          />
        </div>

        {/* 📦 Scholarship Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {placeholderScholarships.map((sch) => (
            <div
              key={sch.id}
              className={`rounded-xl p-4 border transition shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer 
            ${
              theme
                ? "bg-white border-gray-300 hover:border-blue-300"
                : "bg-gray-800 border-gray-700 hover:border-blue-400"
            }
          `}
            >
              {/* Uni Image */}
              <img
                src={sch.image}
                alt={sch.university}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />

              {/* Title */}
              <h3
                className={`text-lg font-semibold mb-1 ${
                  theme ? "text-gray-900" : "text-white"
                }`}
              >
                {sch.university}
              </h3>

              {/* Category */}
              <p
                className={`text-sm mb-1 ${
                  theme ? "text-blue-600" : "text-blue-400"
                }`}
              >
                {sch.category}
              </p>

              {/* Location */}
              <p
                className={`text-sm mb-1 ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                📍 {sch.location}
              </p>

              {/* Fee */}
              <p
                className={`text-sm mb-4 ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Application Fee:{" "}
                <span className="font-medium">
                  {sch.fee > 0 ? `$${sch.fee}` : "Free"}
                </span>
              </p>

              {/* Button */}
              <button
                onClick={() => navigate(`/scholarship/${sch.id}`)}
                className={`w-full py-2 px-4 rounded-md font-medium transition 
              ${
                theme
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;
