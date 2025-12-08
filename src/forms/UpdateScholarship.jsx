import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "../hooks/useTheme";
import { scholarshipSchema } from "../validations/scholarshipValidation";
import { ScholarshipAPI } from "../api";

function formatDate(dateString) {
  return new Date(dateString).toISOString().split("T")[0];
}

const UpdateScholarship = ({ scholarship }) => {
  console.log(scholarship);
  const { theme } = useTheme();
  const [postScholarshipError, setPostScholarshipError] = useState({
    status: false,
    message: "",
  });

  //prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset,} = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
        applicationDeadline: formatDate(scholarship.applicationDeadline),
        applicationFees: scholarship.applicationFees,
        degree: scholarship.degree,
        postedUserEmail: scholarship.postedUserEmail,
        scholarshipCategory: scholarship.scholarshipCategory,
        scholarshipName: scholarship.scholarshipName,
        scholarshipPostDate: scholarship.scholarshipPostDate,
        serviceCharge: scholarship.serviceCharge,
        subjectCategory: scholarship.subjectCategory,
        tuitionFees: scholarship.tuitionFees,
        universityCity: scholarship.universityCity,
        universityCountry: scholarship.universityCountry,
        universityImage: scholarship.universityImage,
        universityName: scholarship.universityName,
        universityWorldRank: scholarship.universityWorldRank,
    },
  });

  const onSubmit = async (data) => {
    console.log("SCHOLARSHIP FORM DATA:", data);

    try {
      const res = await ScholarshipAPI.updateScholarship(data);
      toast.success(res.data.message);
      reset();
    } catch (error) {
      console.error(error);
      setPostScholarshipError({
        status: true,
        message: `Posting Scholarship Error: ${error.response.data.message}`,
      });
    }
  };

  return (
    <div
      className={`py-10 max-h-screen transition overflow-auto ${
        theme ? "bg-gray-50" : "bg-gray-900"
      } rounded-xl`}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl font-bold mb-10 text-center ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Update Scholarship
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-8 rounded-xl border transition ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          {/* --- Grid Inputs --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scholarship Name */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Scholarship Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("scholarshipName")}
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="Enter scholarship name"
              />
              {errors.scholarshipName && (
                <p className="text-red-500 text-sm">
                  {errors.scholarshipName.message}
                </p>
              )}
            </div>

            {/* University Name */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                University Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("universityName")}
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.universityName && (
                <p className="text-red-500 text-sm">
                  {errors.universityName.message}
                </p>
              )}
            </div>

            {/* University Image */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                University Image URL <span className="text-red-500">*</span>
              </label>
              <input
                {...register("universityImage")}
                type="url"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.universityImage && (
                <p className="text-red-500 text-sm">
                  {errors.universityImage.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Country <span className="text-red-500">*</span>
              </label>
              <input
                {...register("universityCountry")}
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                {...register("universityCity")}
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            {/* World Rank */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                University World Rank <span className="text-red-500">*</span>
              </label>
              <input
                {...register("universityWorldRank", { valueAsNumber: true })}
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.worldRank && (
                <p className="text-red-500 text-sm">
                  {errors.worldRank.message}
                </p>
              )}
            </div>

            {/* Subject Category */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Subject Category <span className="text-red-500">*</span>
              </label>
              <input
                {...register("subjectCategory")}
                type="text"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400 focus:ring-blue-400"
                    : "text-gray-200 bg-gray-900 border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.subjectCategory && (
                <p className="text-red-500 text-sm">
                  {errors.subjectCategory.message}
                </p>
              )}
            </div>

            {/* Scholarship Category */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Scholarship Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("scholarshipCategory")}
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              >
                <option value="">Select</option>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self Fund</option>
              </select>
              {errors.scholarshipCategory && (
                <p className="text-red-500 text-sm">
                  {errors.scholarshipCategory.message}
                </p>
              )}
            </div>

            {/* Degree */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Degree <span className="text-red-500">*</span>
              </label>
              <select
                {...register("degree")}
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              >
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.degree && (
                <p className="text-red-500 text-sm">{errors.degree.message}</p>
              )}
            </div>

            {/* Tuition Fees */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Tuition Fees (Optional)
              </label>
              <input
                {...register("tuitionFees", { valueAsNumber: true })}
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              />
              {errors.tuitionFees && (
                <p className="text-red-500 text-sm">
                  {errors.tuitionFees.message}
                </p>
              )}
            </div>

            {/* Application Fees */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Application Fees <span className="text-red-500">*</span>
              </label>
              <input
                {...register("applicationFees", { valueAsNumber: true })}
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              />
              {errors.applicationFees && (
                <p className="text-red-500 text-sm">
                  {errors.applicationFees.message}
                </p>
              )}
            </div>

            {/* Service Charge */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Service Charge <span className="text-red-500">*</span>
              </label>
              <input
                {...register("serviceCharge", { valueAsNumber: true })}
                type="number"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              />
              {errors.serviceCharge && (
                <p className="text-red-500 text-sm">
                  {errors.serviceCharge.message}
                </p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <input
                {...register("applicationDeadline")}
                type="date"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            {/* Posted User Email */}
            <div>
              <label
                className={`text-sm font-medium ${
                  theme ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Posted User Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("postedUserEmail")}
                type="email"
                className={`w-full mt-1 px-4 py-2 rounded-lg border transition ${
                  theme
                    ? "text-gray-800 bg-white border-gray-400"
                    : "text-gray-200 bg-gray-900 border-gray-600"
                }`}
                placeholder="admin@example.com"
                readOnly
              />
              {errors.userEmail && (
                <p className="text-red-500 text-sm">
                  {errors.userEmail.message}
                </p>
              )}
            </div>
          </div>
          <div>
            {postScholarshipError.status && (
              <p className="text-red-500 text-sm">
                {postScholarshipError.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              <PlusCircle size={20} />{" "}
              {isSubmitting ? "Processing..." : "Add Scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarship;
