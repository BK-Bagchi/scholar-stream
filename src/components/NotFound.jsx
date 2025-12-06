import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-[65vh] flex flex-col items-center justify-center px-4 text-center transition-colors ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <AlertCircle
        className={`w-16 h-16 mb-6 ${
          theme ? "text-blue-600" : "text-blue-400"
        }`}
      />
      <h1
        className={`text-6xl font-bold mb-4 ${
          theme ? "text-gray-800" : "text-gray-100"
        }`}
      >
        404
      </h1>
      <h2
        className={`text-2xl md:text-3xl font-semibold mb-2 ${
          theme ? "text-gray-700" : "text-gray-200"
        }`}
      >
        Page Not Found
      </h2>
      <p
        className={`mb-6 max-w-md ${theme ? "text-gray-600" : "text-gray-400"}`}
      >
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Link
        to="/"
        className={`inline-block px-6 py-3 rounded-md font-medium transition ${
          theme
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-500 text-gray-100 hover:bg-blue-600"
        }`}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
