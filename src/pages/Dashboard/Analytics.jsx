import { Users, Banknote, GraduationCap, BarChart3 } from "lucide-react";
//prettier-ignore
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { ApplicationAPI } from "../../api";

const Analytics = () => {
  const { theme } = useTheme();
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await ApplicationAPI.getAnalytics();
        setApplications(res.data.applications);
        setScholarships(res.data.scholarships);
        setUsers(res.data.users);
      } catch (err) {
        console.error(err.response?.data?.message);
      }
    };
    fetchAnalytics();
  }, []);
  // console.log(applications);
  // console.log(scholarships);
  // console.log(users);

  const fullFundedScholarships = applications.filter(
    (app) => app.scholarshipCategory === "Full fund"
  );
  const partialFundedScholarships = applications.filter(
    (app) => app.scholarshipCategory === "Partial"
  );
  const selfFundedScholarships = applications.filter(
    (app) => app.scholarshipCategory === "Self-fund"
  );

  const totalFees = applications
    .filter((app) => app.paymentStatus === "paid")
    .reduce((sum, app) => sum + (app.payment?.amount || 0), 0);

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <Users size={26} />,
      color: "text-blue-500",
    },
    {
      title: "Fees Collected",
      value: `$ ${totalFees}`,
      icon: <Banknote size={26} />,
      color: "text-green-500",
    },
    {
      title: "Total Scholarships",
      value: scholarships.length,
      icon: <GraduationCap size={26} />,
      color: "text-purple-500",
    },
  ];

  const chartData = [
    { university: "Full Fund", applications: fullFundedScholarships.length },
    {
      university: "Partial Fund",
      applications: partialFundedScholarships.length,
    },
    { university: "Self Fund", applications: selfFundedScholarships.length },
  ];

  return (
    <div
      className={`p-6 min-h-screen rounded-2xl transition ${
        theme ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={28} className="text-electricBlue" />
        <h1 className="text-2xl font-bold">Analytics Overview</h1>
      </div>

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

      <div
        className={`p-6 rounded-2xl shadow-md transition ${
          theme ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Applications Per Scholarship category
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
