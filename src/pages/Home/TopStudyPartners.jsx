import { useEffect, useState } from "react";
import { ProfileAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import PartnerCard from "../../components/PartnerCard";
import { useTheme } from "../../hooks/useTheme";
import Loader from "../../components/Loader";

const TopStudyPartners = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await ProfileAPI.getAllProfile();
        setPartners(res.data.profiles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);
  // console.log(partners);

  const filteredPartners = (() => {
    const validPartners = user
      ? partners.filter(
          (partner) =>
            partner && partner._id !== user._id && partner.experienceLevel
        )
      : partners.filter((partner) => partner && partner.experienceLevel);

    const priorityOrder = ["expert", "intermediate", "beginner"];
    const sortedPartners = validPartners.sort(
      (a, b) =>
        priorityOrder.indexOf(a.experienceLevel.toLowerCase()) -
        priorityOrder.indexOf(b.experienceLevel.toLowerCase())
    );

    return sortedPartners.slice(0, 5);
  })();
  // console.log(filteredPartners);

  return (
    <section
      className={`py-12 transition ${theme ? "bg-gray-50" : "bg-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-8 text-center transition ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Top Study Partners
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <div></div>
              <Loader />
              <div></div>
            </>
          ) : (
            filteredPartners.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} theme={theme} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TopStudyPartners;
