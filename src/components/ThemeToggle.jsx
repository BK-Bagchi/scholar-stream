import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative flex items-center w-14 h-7 rounded-full transition-all duration-300 
        ${theme ? "bg-softWhite/70" : "bg-gray-700/60"} 
        backdrop-blur shadow-inner border border-white/20`}
    >
      <span
        className={`absolute flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300
          ${
            theme
              ? "translate-x-7 bg-white shadow-lg"
              : "translate-x-1 bg-gray-900 shadow-md"
          }`}
      >
        {theme ? (
          <Sun size={16} className="text-yellow-500" />
        ) : (
          <Moon size={16} className="text-white" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
