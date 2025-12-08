import React, { useEffect, useState } from "react";
import { Pencil, Trash2, School } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ScholarshipAPI } from "../../api";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import UpdateScholarship from "../../forms/UpdateScholarship";
import { toast } from "react-toastify";

const ManageScholarships = () => {
  const { theme } = useTheme();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScholarship, setUpdateScholarship] = useState(null);
  const [updateScholarshipModal, setUpdateScholarshipModal] = useState(false);

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

  const handleDeleteScholarship = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this scholarship?"
    );
    if (!confirmation) return;

    try {
      const res = await ScholarshipAPI.deleteScholarship(id);
      toast.success(res.data.message);

      setScholarships((prev) => prev.filter((sch) => sch._id !== id));
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className={`py-10 min-h-screen transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Title */}
        <h2
          className={`text-3xl font-bold mb-8 text-center transition ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Manage Scholarships
        </h2>

        {/* Table Container */}
        <div
          className={`overflow-x-auto rounded-xl border transition ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full text-left">
              {/* Table Head */}
              <thead>
                <tr
                  className={`text-sm ${
                    theme
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <th className="px-6 py-3">Scholarship Name</th>
                  <th className="px-6 py-3">University</th>
                  <th className="px-6 py-3">Country</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Degree</th>
                  <th className="px-6 py-3">Fees</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {scholarships.length > 0 ? (
                  scholarships.map((sch) => (
                    <tr
                      key={sch.id}
                      className={`border-t transition ${
                        theme
                          ? "border-gray-200 hover:bg-gray-100"
                          : "border-gray-700 hover:bg-gray-700/40"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium flex items-center gap-2">
                        <School
                          size={18}
                          className={theme ? "text-blue-600" : "text-blue-400"}
                        />
                        {sch.scholarshipName || "Null"}
                      </td>
                      <td className="px-6 py-4">
                        {sch.universityName || "Null"}
                      </td>
                      <td className="px-6 py-4">
                        {sch.universityCountry || "Null"}
                      </td>
                      <td className="px-6 py-4">
                        {sch.universityCity || "Null"}
                      </td>
                      <td className="px-6 py-4">
                        {sch.universityWorldRank || "Null"}
                      </td>
                      <td className="px-6 py-4">
                        {sch.scholarshipCategory || "Null"}
                      </td>
                      <td className="px-6 py-4">{sch.degree || "Null"}</td>
                      <td className="px-6 py-4">{sch.tuitionFees || "Null"}</td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          {/* Update Button */}
                          <button
                            className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm transition ${
                              theme
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                : "bg-blue-900 text-blue-300 hover:bg-blue-800"
                            }`}
                            onClick={() => {
                              setUpdateScholarship(sch);
                              setUpdateScholarshipModal(true);
                            }}
                          >
                            <Pencil size={16} />
                            Update
                          </button>

                          {/* Delete Button */}
                          <button
                            className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm transition ${
                              theme
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-red-900 text-red-300 hover:bg-red-800"
                            }`}
                            onClick={() => handleDeleteScholarship(sch._id)}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      No scholarships found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {updateScholarshipModal && (
        <Modal
          render={<UpdateScholarship scholarship={updateScholarship} />}
          setActiveModal={setUpdateScholarshipModal}
        />
      )}
    </div>
  );
};

export default ManageScholarships;
