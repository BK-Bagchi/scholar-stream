import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
//prettier-ignore
import { Star, Globe, Calendar, MapPin, BadgeDollarSign, GraduationCap, Layers, Badge, LibraryBig } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { ApplicationAPI, PaymentAPI, ReviewAPI, ScholarshipAPI } from "../api";
import Loader from "../components/Loader";
import formatText from "../utils/formatText";

const ScholarshipDetails = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { id } = useParams();

  const [scholarships, setScholarships] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);

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

    const fetchReviews = async () => {
      try {
        const res = await ReviewAPI.getReviews();
        setReviews(res.data.reviews);
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        setReviewLoading(false);
      }
    };

    const fetchUserApplications = async () => {
      try {
        const res = await ApplicationAPI.getUserApplications();
        setApplications(res.data.applications);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchScholarships();
    fetchReviews();
    fetchUserApplications();
  }, []);
  // console.log(scholarships);
  // console.log(reviews);
  // console.log(applications);

  const filterReviews = reviews.filter((rev) => rev.scholarshipId._id === id);

  const scholarship = scholarships.find((s) => s._id === id);
  const isApplied = applications.some((app) => app.scholarshipId._id === id);

  const handleApplication = async (scholarship) => {
    const confirmation = window.confirm("Are you sure you want to apply?");
    if (!confirmation) return;

    localStorage.setItem("scholarshipName", scholarship.scholarshipName);
    const data = {
      scholarshipId: scholarship._id,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      degree: scholarship.degree,
      tuitionFees: scholarship.tuitionFees,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
    };

    try {
      const res = await PaymentAPI.makePayment(data);

      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Payment error");
    }
  };

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
        {loading ? (
          <Loader />
        ) : scholarships.length > 0 ? (
          <div
            className={`rounded-2xl p-6 border mb-10 transition-all shadow-md hover:shadow-lg ${
              theme ? "bg-white border-gray-300" : "bg-gray-900 border-gray-700"
            }`}
          >
            {/* Top Image */}
            <div className="relative w-full h-64 mb-6">
              <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="rounded-xl w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                {formatText(scholarship.scholarshipCategory)}
              </span>
            </div>

            {/* Title */}
            <h3
              className={`text-3xl font-bold mb-1 ${
                theme ? "text-gray-900" : "text-white"
              }`}
            >
              {scholarship.scholarshipName}
            </h3>

            {/* University */}
            <p
              className={`flex items-center gap-1 text-lg mb-4 ${
                theme ? "text-blue-600" : "text-blue-400"
              }`}
            >
              <LibraryBig size={20} />
              {scholarship.universityName}
            </p>

            {/* Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-base">
              {/* World Rank */}
              <p
                className={`flex items-center gap-1 ${
                  theme ? "text-blue-600" : "text-blue-400"
                }`}
              >
                <Globe size={18} />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  <span className="font-semibold">World Rank:</span>{" "}
                  {scholarship.universityWorldRank}
                </span>
              </p>

              {/* Deadline */}
              <p
                className={`flex items-center gap-1 ${
                  theme ? "text-blue-600" : "text-blue-400"
                }`}
              >
                <Calendar size={18} />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(
                    scholarship.applicationDeadline
                  ).toLocaleDateString()}
                </span>
              </p>

              {/* Location */}
              <p
                className={`flex items-center gap-1 ${
                  theme ? "text-blue-600" : "text-blue-400"
                }`}
              >
                <MapPin size={18} />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  <span className="font-semibold">Location:</span>{" "}
                  {scholarship.universityCity}, {scholarship.universityCountry}
                </span>
              </p>

              {/* Scholarship Category */}
              <p
                className={`flex items-center gap-1 ${
                  theme ? "text-blue-600" : "text-blue-400"
                }`}
              >
                <BadgeDollarSign size={18} />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  <span className="font-semibold">Scholarship Category:</span>{" "}
                  {formatText(scholarship.scholarshipCategory)}
                </span>
              </p>

              {/* Degree */}
              <p
                className={`flex items-center gap-1 ${
                  theme ? "text-blue-600" : "text-blue-400"
                }`}
              >
                <GraduationCap size={18} />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  <span className="font-semibold">Degree:</span>{" "}
                  {scholarship.degree}
                </span>
              </p>

              {/* Subject */}
              <p
                className={`flex items-center gap-1 ${
                  theme ? "text-blue-600" : "text-blue-400"
                }`}
              >
                <Layers size={18} />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  <span className="font-semibold">Subject:</span>{" "}
                  {scholarship.subjectCategory}
                </span>
              </p>
            </div>

            {/* Tuition & Charges */}
            <div
              className={`p-4 rounded-xl border ${
                theme
                  ? "bg-gray-50 border-gray-300"
                  : "bg-gray-800 border-gray-700"
              } mb-6`}
            >
              <h4
                className={`text-lg font-semibold mb-2 ${
                  theme ? "text-gray-900" : "text-white"
                }`}
              >
                Fees & Coverage
              </h4>
              <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  <span className="font-semibold">Application Fees: </span>
                  {scholarship.applicationFees > 0
                    ? `$${scholarship.applicationFees}`
                    : "Free"}
                </span>
              </p>
              <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
                <span className="font-semibold">Tuition Fees: </span> $
                {scholarship.tuitionFees}
              </p>

              <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
                <span className="font-semibold">Service Charge: </span> $
                {scholarship.serviceCharge}
              </p>
            </div>

            {/* Apply Button */}
            <button
              disabled={isApplied}
              onClick={() => handleApplication(scholarship)}
              className={`w-full py-3 text-center rounded-xl font-semibold transition-all text-white shadow ${
                theme
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } ${isApplied ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isApplied
                ? "Applied for this Scholarship"
                : "Apply for Scholarship"}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-2xl font-semibold text-gray-700">
              No scholarships found.
            </p>
          </div>
        )}

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

          {reviewLoading ? (
            <Loader />
          ) : filterReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterReviews.map((rev) => (
                <div
                  key={rev._id}
                  className={`p-4 rounded-lg border transition ${
                    theme
                      ? "bg-white border-gray-300 hover:border-blue-300"
                      : "bg-gray-800 border-gray-700 hover:border-blue-400"
                  }`}
                >
                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={rev.userImage}
                      alt={rev.userName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />

                    <div>
                      <p
                        className={`font-semibold ${
                          theme ? "text-gray-900" : "text-white"
                        }`}
                      >
                        {rev.userName}
                      </p>

                      <p
                        className={`text-sm ${
                          theme ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {new Date(rev.reviewDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* University */}
                  <p
                    className={`text-sm font-medium mb-2 ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    University:{" "}
                    <span
                      className={`${theme ? "text-gray-900" : "text-gray-100"}`}
                    >
                      {rev.universityName}
                    </span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rev.ratingPoint)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
                    {rev.reviewComment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className={`${theme ? "text-gray-700" : "text-gray-300"}`}>
              No reviews yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
