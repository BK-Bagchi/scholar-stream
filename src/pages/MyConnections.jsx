import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Avatar from "../assets/Default_Avatar.jpeg";
import { ConnectionAPI, ProfileAPI } from "../api";
import Modal from "../components/Modal";
import UpdatePartnerProfile from "../forms/UpdatePartnerProfile";
import { useTheme } from "../hooks/useTheme";
import Loader from "../components/Loader";

const MyConnections = () => {
  const { theme } = useTheme();
  const [myConnections, setMyConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateConnection, setUpdateConnection] = useState({});

  useEffect(() => {
    const getMyConnections = async () => {
      try {
        const res = await ConnectionAPI.getConnectionList();
        setMyConnections(res.data.connected);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMyConnections();
  }, []);
  // console.log(myConnections);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this connection?")) {
      try {
        const res = await ProfileAPI.deleteProfile(_id);
        console.log(res);
      } catch (error) {
        console.error(error);
      } finally {
        setMyConnections((prev) =>
          prev.filter((c) => c.connected?._id !== _id)
        );
        toast.success("Connection deleted successfully!");
      }
    }
  };

  const handleUpdate = (_id) => {
    const connection = myConnections.find((c) => c.connected?._id === _id);
    setUpdateConnection(connection.connected);
    setUpdateModal(true);
  };

  return (
    <div
      className={`py-12 min-h-[70vh] transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-8 text-center transition ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          My Connections
        </h2>

        <div
          className={`overflow-x-auto shadow-md rounded-lg transition ${
            theme ? "bg-white" : "bg-gray-800"
          }`}
        >
          <table className="min-w-full table-auto">
            <thead
              className={`transition ${
                theme ? "bg-blue-600 text-white" : "bg-blue-500 text-gray-100"
              }`}
            >
              <tr>
                <th className="px-4 py-2 text-left">Partner</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Study Mode</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <Loader />
                  </td>
                </tr>
              ) : (
                <>
                  {myConnections.map(
                    (conn) =>
                      conn.connected && (
                        <tr
                          key={conn.connected?._id}
                          className={`transition hover:${
                            theme ? "bg-gray-100" : "bg-gray-700"
                          }`}
                        >
                          <td className="px-4 py-3 flex items-center gap-3">
                            <img
                              src={conn.connected?.avatar || Avatar}
                              alt={conn.connected?.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span
                              className={`font-medium transition ${
                                theme ? "text-gray-800" : "text-gray-100"
                              }`}
                            >
                              {conn.connected?.name}
                            </span>
                          </td>
                          <td
                            className={`px-4 py-3 transition ${
                              theme ? "text-gray-700" : "text-gray-300"
                            }`}
                          >
                            {conn.connected?.subject}
                          </td>
                          <td
                            className={`px-4 py-3 transition ${
                              theme ? "text-gray-700" : "text-gray-300"
                            }`}
                          >
                            {conn.connected?.studyMode}
                          </td>
                          <td className="px-4 py-3 flex justify-center gap-2">
                            <button
                              onClick={() => handleUpdate(conn.connected?._id)}
                              className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                            >
                              <Pencil className="w-4 h-4" /> Update
                            </button>
                            <button
                              onClick={() => handleDelete(conn.connected?._id)}
                              className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                  {myConnections.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className={`text-center py-6 transition ${
                          theme ? "text-gray-500" : "text-gray-300"
                        }`}
                      >
                        No connections found.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {updateModal && (
          <Modal
            render={
              <UpdatePartnerProfile
                connection={updateConnection}
                setMyConnections={setMyConnections}
                setUpdateModal={setUpdateModal}
              />
            }
            setActiveModal={setUpdateModal}
          />
        )}
      </div>
    </div>
  );
};

export default MyConnections;
