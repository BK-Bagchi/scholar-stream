import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        theme ? "bg-gray-200" : "bg-gray-800"
      } hover:scale-110 transition`}
      aria-label="Toggle theme"
    >
      {theme ? (
        <Sun size={20} className="text-yellow-600" />
      ) : (
        <Moon size={20} className="text-gray-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
