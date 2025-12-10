import {
  UserGroupIcon,
  PhotoIcon,
  PencilSquareIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RecentPhoto from "../tables/RecentPhoto";
import RecentBlogs from "../tables/RecentBlogs";
import RecentVideo from "../tables/RecentVideo";
import RecentContact from "../tables/RecentContact";
import RecentReview from "../tables/RecentReview";

const Dashboard = () => {
  // Stats Data
  const stats = [
    {
      title: "Total Admins",
      count: 12,
      icon: <UserGroupIcon className="w-10 h-10 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Photos",
      count: 250,
      icon: <PhotoIcon className="w-10 h-10 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Total Blogs",
      count: 48,
      icon: <PencilSquareIcon className="w-10 h-10 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Total Contacts",
      count: 102,
      icon: <PhoneIcon className="w-10 h-10 text-orange-600" />,
      bg: "bg-orange-100",
    },
    {
      title: "Total Reviews",
      count: 37,
      icon: <ChatBubbleLeftRightIcon className="w-10 h-10 text-pink-600" />,
      bg: "bg-pink-100",
    },
    {
      title: "Total Videos",
      count: 87,
      icon: <VideoCameraIcon className="w-10 h-10 text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  // Pie Chart Data
  const pieData = [
    { name: "January", value: 300 },
    { name: "February", value: 450 },
    { name: "March", value: 320 },
    { name: "April", value: 500 },
  ];

  const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((box, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-lg border border-gray-200 
            hover:shadow-xl transition-all duration-300 cursor-pointer ${box.bg}`}
          >
            <div className="flex justify-between items-center mb-4">
              {box.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {box.title}
            </h3>

            <p className="text-3xl font-bold text-gray-900">{box.count}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="mt-10 w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Monthly Website Visitors
        </h2>

        <div
          className="
            bg-white p-6 rounded-2xl shadow-xl border border-gray-100
            flex justify-center items-center
            w-full
          "
        >
          <div className="w-full h-80 sm:h-72 xs:h-64 min-[350px]:h-60 min-[300px]:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  innerRadius="55%"
                  paddingAngle={4}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                  }}
                />

                <Legend verticalAlign="bottom" height={30} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <RecentPhoto/>
      <RecentBlogs/>
      <RecentVideo/>
      <RecentContact/>
      <RecentReview/>
      
    </div>
  );
};

export default Dashboard;
