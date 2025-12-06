import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "../assets/Icon_Google.png";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../validations/userValidation";
import { useTheme } from "../hooks/useTheme";

const Register = () => {
  const { register: registerUser, googleLogin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onRegister = async (data) => {
    // console.log(data);
    const { name, email, password, photoURL } = data;
    try {
      await registerUser(name, email, password, photoURL);
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-center px-4 py-10 border-b transition ${
        theme ? "bg-gray-50 border-gray-200" : "bg-gray-900 border-gray-700"
      }`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-lg shadow-lg transition ${
          theme ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-6 transition ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Create Your StudyMate Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onRegister)}>
          <div>
            <label
              htmlFor="name"
              className={`block font-medium mb-1 transition ${
                theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your full name"
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                theme
                  ? "text-gray-700 border border-gray-500 bg-white"
                  : "text-gray-100 border border-gray-600 bg-gray-700"
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block font-medium mb-1 transition ${
                theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                theme
                  ? "text-gray-700 border border-gray-500 bg-white"
                  : "text-gray-100 border border-gray-600 bg-gray-700"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="photo"
              className={`block font-medium mb-1 transition ${
                theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Photo URL
            </label>
            <input
              type="url"
              {...register("photoURL")}
              placeholder="https://yourphoto.com/photo.jpg"
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                theme
                  ? "text-gray-700 border border-gray-500 bg-white"
                  : "text-gray-100 border border-gray-600 bg-gray-700"
              }`}
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm">{errors.photoURL.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block font-medium mb-1 transition ${
                theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter a strong password"
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                theme
                  ? "text-gray-700 border border-gray-500 bg-white"
                  : "text-gray-100 border border-gray-600 bg-gray-700"
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className={`block font-medium mb-1 transition ${
                theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Enter a strong password"
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                theme
                  ? "text-gray-700 border border-gray-500 bg-white"
                  : "text-gray-100 border border-gray-600 bg-gray-700"
              }`}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium transition ${
              theme
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr
            className={`flex-1 transition ${
              theme ? "border-gray-300" : "border-gray-600"
            }`}
          />
          <span
            className={`mx-2 transition ${
              theme ? "text-gray-700" : "text-gray-300"
            }`}
          >
            OR
          </span>
          <hr
            className={`flex-1 transition ${
              theme ? "border-gray-300" : "border-gray-600"
            }`}
          />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className={`w-full flex items-center justify-center py-2 rounded-md transition ${
            theme
              ? "text-gray-700 border border-gray-300 hover:bg-gray-100"
              : "text-gray-100 border border-gray-600 hover:bg-gray-700"
          }`}
        >
          <img src={GoogleIcon} alt="Google" className="w-6 h-6 mr-2" />
          Sign up with Google
        </button>

        <p
          className={`mt-4 text-center transition ${
            theme ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-medium hover:underline transition ${
              theme ? "text-blue-600" : "text-blue-400"
            }`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
