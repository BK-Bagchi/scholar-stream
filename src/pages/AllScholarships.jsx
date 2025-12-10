import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//prettier-ignore
import { MapPin, GraduationCap, Banknote, School, Calendar, BookOpen } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ScholarshipAPI } from "../api";
import Loader from "../components/Loader";

const AllScholarships = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageFromURL = parseInt(query.get("page")) || 1;
    setPage(pageFromURL);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ScholarshipAPI.getAllScholarships();
        setScholarships(res.data.scholarships);
      } catch (err) {
        console.error(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // console.log(scholarships);

  const filtered = scholarships
    .filter((s) => {
      const q = search.toLowerCase();
      return (
        s.scholarshipName.toLowerCase().includes(q) ||
        s.universityName.toLowerCase().includes(q) ||
        s.degree.toLowerCase().includes(q)
      );
    })
    .filter((s) =>
      categoryFilter ? s.scholarshipCategory === categoryFilter : true
    )
    .filter((s) => (subjectFilter ? s.subjectCategory === subjectFilter : true))
    .filter((s) =>
      locationFilter
        ? `${s.universityCity}, ${s.universityCountry}` === locationFilter
        : true
    );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "category")
      return a.scholarshipCategory.localeCompare(b.scholarshipCategory);
    if (sortBy === "subject")
      return a.subjectCategory.localeCompare(b.subjectCategory);
    if (sortBy === "location")
      return `${a.universityCity} ${a.universityCountry}`.localeCompare(
        `${b.universityCity} ${b.universityCountry}`
      );
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = sorted.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (newPage) => navigate(`?page=${newPage}`);

  return (
    <div className={`py-12 ${theme ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2
            className={`text-3xl font-bold ${
              theme ? "text-blue-600" : "text-blue-400"
            }`}
          >
            Explore Scholarships
          </h2>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white text-gray-800 border-gray-300"
                : "bg-gray-800 text-gray-200 border-gray-700"
            }`}
          >
            <option value="">Sort By</option>
            <option value="category">Scholarship Category (A-Z)</option>
            <option value="subject">Subject Category (A-Z)</option>
            <option value="location">Location (A-Z)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white border-gray-400 text-gray-700"
                : "bg-gray-800 border-gray-700 text-gray-200"
            }`}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white text-gray-700"
                : "bg-gray-800 text-gray-200 border-gray-700"
            }`}
          >
            <option value="">Category</option>
            {[...new Set(scholarships.map((s) => s.scholarshipCategory))].map(
              (cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white text-gray-700"
                : "bg-gray-800 text-gray-200 border-gray-700"
            }`}
          >
            <option value="">Subject</option>
            {[...new Set(scholarships.map((s) => s.subjectCategory))].map(
              (sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              )
            )}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white text-gray-700"
                : "bg-gray-800 text-gray-200 border-gray-700"
            }`}
          >
            <option value="">Location</option>
            {[
              ...new Set(
                scholarships.map(
                  (s) => `${s.universityCity}, ${s.universityCountry}`
                )
              ),
            ].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginated.length > 0 ? (
                paginated.map((sch) => (
                  <div
                    key={sch._id}
                    className={`rounded-xl p-4 border transition hover:-translate-y-1 cursor-pointer ${
                      theme
                        ? "bg-white border-gray-300 hover:border-blue-300"
                        : "bg-gray-800 border-gray-700 hover:border-blue-400"
                    }`}
                  >
                    <img
                      src={sch.universityImage}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />

                    <h3
                      className={`text-lg font-semibold ${
                        theme ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {sch.scholarshipName}
                    </h3>

                    <p className="text-blue-500 flex items-center gap-1">
                      <School size={16} /> {sch.universityName}
                    </p>

                    <p
                      className={`flex items-center gap-1 ${
                        theme ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <BookOpen size={16} /> {sch.subjectCategory}
                    </p>

                    <p
                      className={`flex items-center gap-1 ${
                        theme ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <GraduationCap size={16} /> {sch.scholarshipCategory} —{" "}
                      {sch.degree}
                    </p>

                    <p
                      className={`flex items-center gap-1 ${
                        theme ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <MapPin size={16} /> {sch.universityCity},{" "}
                      {sch.universityCountry}
                    </p>

                    <p
                      className={`flex items-center gap-1 ${
                        theme ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <Banknote size={16} /> Tuition Fee:{" "}
                      <span className="font-medium">
                        {sch.tuitionFees > 0 ? `$${sch.tuitionFees}` : "Free"}
                      </span>
                    </p>

                    <p
                      className={`flex items-center gap-1 ${
                        theme ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <Calendar size={16} /> Deadline:{" "}
                      {new Date(sch.applicationDeadline).toLocaleDateString()}
                    </p>
                    <div
                      className="bg-electricBlue rounded-lg p-3 mt-3 text-center text-white"
                      onClick={() => navigate(`/scholarship/${sch._id}`)}
                    >
                      View Details
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  No scholarships found.
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-md border ${
                    theme ? "text-gray-600" : "text-gray-200"
                  } ${
                    page === 1
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-2 rounded-md border ${
                      theme ? "text-gray-600" : "text-gray-200"
                    } ${
                      page === i + 1
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-md border ${
                    theme ? "text-gray-600" : "text-gray-200"
                  } ${
                    page === totalPages
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
