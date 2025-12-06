import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "../assets/Icon_Google.png";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { loginSchema } from "../validations/userValidation";
import { useTheme } from "../hooks/useTheme";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ 
      resolver: zodResolver(loginSchema) 
  });
  const onLogin = async (data) => {
    // console.log(data);
    const { email, password } = data;
    try {
      await login(email, password);
      toast.success("Login successful!");
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
      className={`flex items-center justify-center border-b ${
        theme ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-900"
      } px-4 py-20`}
    >
      <div
        className={`max-w-md w-full ${
          theme ? "bg-white" : "bg-gray-800"
        } p-8 rounded-lg shadow-lg`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-6 ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Login to StudyMate
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onLogin)}>
          <div>
            <label
              htmlFor="email"
              className={`block font-medium mb-1 ${
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
              htmlFor="password"
              className={`block font-medium mb-1 ${
                theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
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
            <p
              className={`text-sm text-right my-3 hover:underline cursor-pointer ${
                theme ? "text-blue-600" : "text-blue-400"
              }`}
            >
              Forgot your password?
            </p>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium transition ${
              theme
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr
            className={`flex-1 ${
              theme ? "border-gray-300" : "border-gray-600"
            }`}
          />
          <span className={`mx-2 ${theme ? "text-gray-700" : "text-gray-300"}`}>
            OR
          </span>
          <hr
            className={`flex-1 ${
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
          Sign in with Google
        </button>

        <p
          className={`mt-4 text-center ${
            theme ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className={`font-medium hover:underline ${
              theme ? "text-blue-600" : "text-blue-400"
            }`}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
