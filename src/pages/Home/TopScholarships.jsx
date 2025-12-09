import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//prettier-ignore
import { MapPin, GraduationCap, Banknote, School, Calendar,} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { ScholarshipAPI } from "../../api";
import Loader from "../../components/Loader";

const TopScholarships = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await ScholarshipAPI.getAllScholarships();
        setScholarships(res.data.scholarships);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className={`py-14 transition ${theme ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-3xl md:text-4xl font-bold mb-10 text-center ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Top Scholarships
        </motion.h2>

        {/* LOADER */}
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {scholarships.length > 0 ? (
              scholarships.map((sch) => (
                <motion.div
                  key={sch._id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className={`rounded-xl border p-5 shadow-md cursor-pointer transition relative overflow-hidden
                    ${
                      theme
                        ? "bg-white border-gray-300 hover:border-blue-300"
                        : "bg-gray-800 border-gray-700 hover:border-blue-400"
                    }
                  `}
                >
                  {/* Image */}
                  <motion.img
                    src={sch.universityImage}
                    alt={sch.scholarshipName}
                    className="rounded-lg w-full h-40 object-cover mb-4"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      theme ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {sch.scholarshipName}
                  </h3>

                  {/* University */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-1 font-medium ${
                      theme ? "text-blue-600" : "text-blue-400"
                    }`}
                  >
                    <School size={16} />
                    {sch.universityName}
                  </p>

                  {/* Subject Category */}
                  <p
                    className={`text-sm mb-1 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    🎓 {sch.subjectCategory}
                  </p>

                  {/* Category + Degree */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-1 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <GraduationCap size={16} />
                    {sch.scholarshipCategory} — {sch.degree}
                  </p>

                  {/* Location */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-1 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <MapPin size={16} />
                    {sch.universityCity}, {sch.universityCountry}
                  </p>

                  {/* Application Fee */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-3 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <Banknote size={16} />
                    Application Fee:{" "}
                    <span className="font-semibold ml-1">
                      {sch.applicationFees > 0
                        ? `$${sch.applicationFees}`
                        : "Free"}
                    </span>
                  </p>

                  {/* Deadline */}
                  <p
                    className={`flex items-center gap-1 text-sm mb-5 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <Calendar size={16} />
                    Deadline:{" "}
                    <span className="font-medium">
                      {new Date(sch.applicationDeadline).toLocaleDateString()}
                    </span>
                  </p>

                  {/* CTA BUTTON */}
                  <motion.button
                    onClick={() => navigate(`/scholarship/${sch._id}`)}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2 rounded-md font-medium shadow 
                      ${
                        theme
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }
                    `}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No scholarships found.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TopScholarships;
