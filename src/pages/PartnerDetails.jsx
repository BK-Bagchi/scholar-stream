import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import Avatar from "../assets/Default_Avatar.jpeg";
import { ConnectionAPI, ProfileAPI } from "../api";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import MessageBox from "../components/MessageBox";

const PartnerDetails = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { id } = useParams();
  const [partner, setPartner] = useState({});
  const [partnerCount, setPartnerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connectedList, setConnectedList] = useState([]);
  const connected = connectedList.some((c) => c.connected?._id == id);
  const [showMessageBox, setShowMessageBox] = useState(false);

  useEffect(() => {
    const fetchMyPartner = async () => {
      try {
        const res = await ProfileAPI.getProfileById(id);
        setPartner(res.data.profile);
        setPartnerCount(res.data.profile.partnerCount);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMyConnections = async () => {
      try {
        const res = await ConnectionAPI.getConnectionList();
        setConnectedList(res.data.connected);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPartner();
    fetchMyConnections();
  }, [id]);

  const handleSendRequest = async () => {
    const { _id: connectedId } = partner;
    const { email: profileEmail } = user;

    try {
      const res = await ConnectionAPI.makeConnection({
        connectedId,
        profileEmail,
      });

      setConnectedList(res.data.connected);
      setPartnerCount(partnerCount + 1);
      toast.success("Request sent successfully!");
    } catch (error) {
      toast.error("Error sending partner request");
      console.error(error);
    } finally {
      setShowMessageBox(false);
    }
  };

  return (
    <div className={`py-32 transition ${theme ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row transition ${
              theme ? "bg-white" : "bg-gray-800"
            }`}
          >
            <div className="md:w-1/3 w-full">
              <img
                src={partner.avatar || Avatar}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
              <div>
                <h2
                  className={`text-3xl font-bold mb-2 transition ${
                    theme ? "text-gray-800" : "text-gray-100"
                  }`}
                >
                  {partner.name}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span
                    className={`font-medium transition ${
                      theme ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {partner.rating}
                  </span>
                </div>

                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Subject:</span>{" "}
                  {partner.subject}
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Study Mode:</span>{" "}
                  {partner.studyMode}
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Availability:</span>{" "}
                  {partner.availabilityTime}
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Location:</span>{" "}
                  {partner.location}
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Experience Level:</span>{" "}
                  {partner.experienceLevel}
                </p>
                <p
                  className={`mb-2 transition ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <span className="font-semibold">Partner Count:</span>{" "}
                  {partnerCount}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowMessageBox(true)}
                  disabled={connected}
                  className={`w-full md:w-auto px-6 py-3 rounded-md font-medium transition ${
                    theme
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {connected ? "Partner Connected" : "Send Partner Request"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showMessageBox && (
        <Modal
          setActiveModal={setShowMessageBox}
          render={
            <MessageBox
              name={partner.name}
              theme={theme}
              handleSendRequest={handleSendRequest}
            />
          }
        />
      )}
    </div>
  );
};

export default PartnerDetails;
