import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  GraduationCap,
  Banknote,
  School,
  Calendar,
} from "lucide-react";
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
  const [sortCategory, setSortCategory] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 1;

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
  console.log(scholarships);

  const filtered = scholarships.filter((sch) => {
    const s = search.toLowerCase();

    return (
      (sch.scholarshipName || "").toLowerCase().includes(s) ||
      (sch.universityName || "").toLowerCase().includes(s) ||
      (sch.degree || "").toLowerCase().includes(s)
    );
  });

  const fullyFiltered = filtered
    .filter((sch) =>
      sortCategory ? sch.scholarshipCategory === sortCategory : true
    )
    .filter((sch) =>
      subjectFilter ? sch.subjectCategory === subjectFilter : true
    )
    .filter((sch) =>
      locationFilter
        ? `${sch.universityCity}, ${sch.universityCountry}` === locationFilter
        : true
    );

  const totalPages = Math.ceil(fullyFiltered.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = fullyFiltered.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (newPage) => {
    navigate(`?page=${newPage}`);
  };

  return (
    <div className={`py-12 ${theme ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-8 text-center ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Explore Scholarships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white border-gray-400 text-gray-600"
                : "bg-gray-800 border-gray-700 text-gray-200"
            }`}
          />

          <select
            value={sortCategory}
            onChange={(e) => setSortCategory(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white text-gray-600"
                : "bg-gray-800 border-gray-700 text-gray-200"
            }`}
          >
            <option value="">Category</option>
            <option value="Full">Full Scholarship</option>
            <option value="Partial">Partial Scholarship</option>
            <option value="Merit">Merit Based</option>
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme
                ? "bg-white text-gray-600"
                : "bg-gray-800 border-gray-700 text-gray-200"
            }`}
          >
            <option value="">Subject Category</option>
            {[...new Set(scholarships.map((s) => s.subjectCategory))].map(
              (sub) => (
                <option value={sub} key={sub}>
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
                ? "bg-white text-gray-600"
                : "bg-gray-800 border-gray-700 text-gray-200"
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
              <option value={loc} key={loc}>
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
                    onClick={() => navigate(`/scholarship/${sch._id}`)}
                    className={`rounded-xl p-4 border hover:-translate-y-1 transition cursor-pointer ${
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

                    <p className={theme ? "text-gray-700" : "text-gray-300"}>
                      🎓 {sch.subjectCategory}
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
                      <Banknote size={16} /> Application Fee:{" "}
                      <span className="font-medium">
                        {sch.applicationFees > 0
                          ? `$${sch.applicationFees}`
                          : "Free"}
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
                  onClick={() => goToPage(totalPages)}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-md border ${
                    theme ? "text-gray-600" : "text-gray-200"
                  } ${
                    page === totalPages
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Last
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
