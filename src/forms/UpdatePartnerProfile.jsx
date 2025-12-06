import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerSchema } from "../validations/partnerValidation";
import { ProfileAPI } from "../api";
import { toast } from "react-toastify";

const UpdatePartnerProfile = ({
  connection,
  setMyConnections,
  setUpdateModal,
}) => {
  //prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
        name: connection.name,
        email: connection.email,
        photoURL: connection.avatar,
        subject: connection.subject,
        studyMode: connection.studyMode,
        availabilityTime: connection.availabilityTime,
        location: connection.location,
        experienceLevel: connection.experienceLevel,
        rating: connection.rating,
        partnerCount: connection.partnerCount,
    },
  });

  const onSubmit = async (data) => {
    data.avatar = data.photoURL;
    try {
      const res = await ProfileAPI.updateProfile(connection._id, data);
      const updatedProfile = res.data.profile;
      setMyConnections((prev) =>
        prev.map((connection) => {
          if (connection.connected._id === updatedProfile._id) {
            return {
              ...connection,
              connected: updatedProfile,
            };
          }
          return connection;
        })
      );
      toast.success("Partner profile updated successfully!");
      setUpdateModal(false);
    } catch (error) {
      console.error("Error creating partner profile:", error);
      toast.error("Error creating partner profile");
    } finally {
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-12 rounded-lg">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Update Partner Profile
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Your full name"
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                {...register("photoURL")}
                placeholder={"https://example.com/photo.jpg"}
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.photoURL && (
                <p className="text-red-500 text-sm">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                {...register("subject")}
                placeholder="e.g., Mathematics, Programming"
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Study Mode
              </label>
              <select
                {...register("studyMode")}
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
              {errors.studyMode && (
                <p className="text-red-500 text-sm">
                  {errors.studyMode.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Experience Level
              </label>
              <select
                {...register("experienceLevel")}
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              {errors.experienceLevel && (
                <p className="text-red-500 text-sm">
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="City, Area or Preferred Location"
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Availability Time
              </label>
              <input
                type="text"
                {...register("availabilityTime")}
                placeholder="Evening 6-9 PM"
                className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.availabilityTime && (
                <p className="text-red-500 text-sm">
                  {errors.availabilityTime.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Rating (Optional)
            </label>
            <input
              type="number"
              {...register("rating")}
              placeholder="e.g., 4.5"
              className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="0"
              max="5"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Partner Count
            </label>
            <input
              type="number"
              {...register("partnerCount")}
              placeholder="e.g., 10"
              readOnly
              className="w-full px-4 py-2 text-gray-700 border border-gray-500 focus:border-none rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Updating..." : "Update Partner Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePartnerProfile;
