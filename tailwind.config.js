import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        studymate: {
          primary: "#2563EB", // blue-600 — trust & focus
          secondary: "#22C55E", // green-500 — motivation & growth
          accent: "#FACC15", // yellow-400 — highlight
          neutral: "#1E293B", // slate-800 — contrast
          "base-100": "#F8FAFC", // slate-50 — background
          "base-200": "#FFFFFF", // card surface
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      {
        "studymate-dark": {
          primary: "#3B82F6", // blue-500 — calm focus
          secondary: "#10B981", // emerald-500 — soothing accent
          accent: "#FBBF24", // amber-400 — gentle contrast
          neutral: "#F8FAFC", // text color
          "base-100": "#0F172A", // slate-900 — dark background
          "base-200": "#1E293B", // slate-800 — elevated surfaces
          info: "#60A5FA",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
    ],
  },
};
