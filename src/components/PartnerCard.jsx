import { Link } from "react-router-dom";
import { User, BookOpen, Monitor, Star } from "lucide-react";
import Avatar from "../assets/Default_Avatar.jpeg";

const PartnerCard = ({ partner, theme }) => {
  return (
    <div
      key={partner._id}
      className={`transition-all duration-300 rounded-xl overflow-hidden shadow-sm border bg-white/10 backdrop-blur-lg p-6 
               hover:shadow-2xl transform hover:-translate-y-2 ${
                 theme
                   ? "bg-white border-gray-200 hover:shadow-md hover:border-blue-200"
                   : "bg-gray-800 border-gray-700 hover:shadow-md hover:border-blue-400"
               }`}
    >
      <img
        src={partner.avatar || Avatar}
        alt={partner.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 space-y-3">
        <div
          className={`flex items-center gap-2 transition ${
            theme ? "text-gray-800" : "text-gray-100"
          }`}
        >
          <User className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">{partner.name}</h3>
        </div>

        <div
          className={`flex justify-between gap-2 transition ${
            theme ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <div className="flex gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <p className="text-sm">{partner.subject}</p>
          </div>
          <div className="flex gap-2">
            <Monitor className="w-5 h-5 text-teal-500" />
            <p className="text-sm capitalize">{partner.studyMode}</p>
          </div>
        </div>

        <div
          className={`flex justify-between gap-2 transition ${
            theme ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <div className="flex gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <p className="text-sm font-medium">{partner.experienceLevel}</p>
          </div>
          <div className="flex gap-2">
            {partner.rating > 0 && (
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: Math.round(partner.rating) }).map(
                  (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  )
                )}
                <span
                  className={`text-sm ml-1 transition ${
                    theme ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {partner.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
        <Link
          to={`/partner/${partner._id}`}
          className={`block text-center mt-4 py-2 rounded-lg font-medium transition ${
            theme
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PartnerCard;
