import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`border-t transition-colors ${
        theme ? "bg-gray-100 border-gray-200" : "bg-gray-900 border-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0">
          {/* Brand Section */}
          <div className="flex flex-col gap-3">
            <h1
              className={`text-2xl font-bold tracking-wide ${
                theme ? "text-blue-600" : "text-blue-400"
              }`}
            >
              StudyMate
            </h1>
            <p
              className={`max-w-md ${
                theme ? "text-gray-700" : "text-gray-300"
              }`}
            >
              StudyMate is a platform for students to find and connect with the
              perfect study partners based on subjects, learning preferences, or
              nearby locations.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-2">
            <h2
              className={`font-semibold ${
                theme ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Follow Us
            </h2>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className={`transition ${
                  theme
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-gray-400 hover:text-blue-400"
                }`}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`transition ${
                  theme
                    ? "text-gray-600 hover:text-blue-400"
                    : "text-gray-400 hover:text-blue-300"
                }`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`transition ${
                  theme
                    ? "text-gray-600 hover:text-blue-700"
                    : "text-gray-400 hover:text-blue-500"
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`transition ${
                  theme
                    ? "text-gray-600 hover:text-pink-500"
                    : "text-gray-400 hover:text-pink-400"
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-8 border-t pt-4 text-center text-sm transition ${
            theme
              ? "border-gray-300 text-gray-600"
              : "border-gray-700 text-gray-400"
          }`}
        >
          © {new Date().getFullYear()} StudyMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
