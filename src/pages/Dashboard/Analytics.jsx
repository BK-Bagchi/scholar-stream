import { Users, Banknote, GraduationCap, BarChart3 } from "lucide-react";
//prettier-ignore
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "../../hooks/useTheme";

const Analytics = () => {
  const { theme } = useTheme();
  // Placeholder stats
  const stats = [
    {
      title: "Total Users",
      value: "1,240",
      icon: <Users size={26} />,
      color: "text-blue-500",
    },
    {
      title: "Fees Collected",
      value: "$85,210",
      icon: <Banknote size={26} />,
      color: "text-green-500",
    },
    {
      title: "Total Scholarships",
      value: "320",
      icon: <GraduationCap size={26} />,
      color: "text-purple-500",
    },
  ];

  // Placeholder chart data
  const chartData = [
    { university: "Harvard", applications: 120 },
    { university: "MIT", applications: 95 },
    { university: "Stanford", applications: 110 },
    { university: "Oxford", applications: 80 },
    { university: "Toronto", applications: 60 },
  ];

  return (
    <div
      className={`p-6 min-h-screen rounded-2xl transition ${
        theme ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={28} />
        <h1 className="text-2xl font-bold">Analytics Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl shadow-md flex items-center justify-between transition ${
              theme ? "bg-white" : "bg-gray-800"
            }`}
          >
            <div>
              <p className="text-sm opacity-75">{item.title}</p>
              <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
            </div>
            <div className={`opacity-80 ${item.color}`}>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div
        className={`p-6 rounded-2xl shadow-md transition ${
          theme ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Applications Per University
        </h2>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme ? "#d1d5db" : "#4b5563"}
              />
              <XAxis
                dataKey="university"
                stroke={theme ? "#374151" : "#d1d5db"}
              />
              <YAxis stroke={theme ? "#374151" : "#d1d5db"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme ? "#ffffff" : "#1f2937",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Bar
                dataKey="applications"
                fill={theme ? "#2979FF" : "#60a5fa"}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
