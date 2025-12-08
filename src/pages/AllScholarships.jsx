import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//prettier-ignore
import { MapPin, GraduationCap, Banknote, School, Calendar } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ScholarshipAPI } from "../api";
import Loader from "../components/Loader";
// import Loader from "../components/Loader";

const AllScholarships = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await ScholarshipAPI.getAllScholarships();
        setScholarships(res.data.scholarships);
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);
  // console.log(scholarships);

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
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {scholarships.length > 0 ? (
              scholarships.map((sch) => (
                <div
                  key={sch._id}
                  className={`rounded-xl p-4 border transition shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer 
            ${
              theme
                ? "bg-white border-gray-300 hover:border-blue-300"
                : "bg-gray-800 border-gray-700 hover:border-blue-400"
            }`}
                >
                  {/* University Image */}
                  <img
                    src={sch.universityImage}
                    alt={sch.universityName}
                    className="rounded-lg w-full h-40 object-cover mb-4"
                  />

                  {/* Title */}
                  <h3
                    className={`text-lg font-semibold mb-1 ${
                      theme ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {sch.scholarshipName || "Null"}
                  </h3>

                  {/* University */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-1 ${
                      theme ? "text-blue-600" : "text-blue-400"
                    }`}
                  >
                    <School size={16} />
                    {sch.universityName || "Null"}
                  </p>

                  {/* Subject Category */}
                  <p
                    className={`text-sm mb-1 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    🎓 {sch.subjectCategory || "Null"}
                  </p>

                  {/* Scholarship Category + Degree */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-1 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <GraduationCap size={16} />
                    {sch.scholarshipCategory || "Null"} — {sch.degree || "Null"}
                  </p>

                  {/* Location */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-1 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <MapPin size={16} />
                    {sch.universityCity || "Null"},{" "}
                    {sch.universityCountry || "Null"}
                  </p>

                  {/* Application Fee */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-3 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <Banknote size={16} />
                    Application Fee:{" "}
                    <span className="font-medium">
                      {sch.applicationFees > 0
                        ? `$${sch.applicationFees}`
                        : "Free"}
                    </span>
                  </p>

                  {/* Deadline */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-4 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <Calendar size={16} />
                    Deadline:{" "}
                    <span className="font-medium">
                      {new Date(sch.applicationDeadline).toLocaleDateString()}
                    </span>
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/scholarship/${sch._id}`)}
                    className={`w-full py-2 px-4 rounded-md font-medium transition 
              ${
                theme
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No scholarships found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
