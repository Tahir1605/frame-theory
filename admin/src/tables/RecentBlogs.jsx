import React from "react";
import { NavLink } from "react-router-dom";

const RecentBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Sample Blog Title 1",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80",
      date: "12 Jan 2026",
      status: "Published",
    },
    {
      id: 2,
      title: "Sample Blog Title 2",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80",
      date: "10 Jan 2026",
      status: "Unpublished",
    },
    {
      id: 3,
      title: "Sample Blog Title 3",
      image:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=200&q=80",
      date: "08 Jan 2026",
      status: "Published",
    },
    {
      id: 4,
      title: "Sample Blog Title 4",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80",
      date: "05 Jan 2026",
      status: "Published",
    },
    {
      id: 5,
      title: "Sample Blog Title 5",
      image:
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=200&q=80",
      date: "02 Jan 2026",
      status: "Unpublished",
    },
  ];

  return (
    <div className="mt-12 w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
        Recent Blogs
      </h2>

      <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-xl border border-gray-200/60">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-200 text-gray-700">
                <th className="p-4 text-sm font-semibold">SL No.</th>
                <th className="p-4 text-sm font-semibold">Blog title</th>
                <th className="p-4 text-sm font-semibold">Published Date</th>
                <th className="p-4 text-sm font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog, i) => (
                <tr
                  key={blog.id}
                  className="border-b border-gray-200 hover:bg-gray-50/80 transition-all"
                >
                  <td className="p-4 font-semibold text-gray-900">
                    {blog.id}
                  </td>

                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={blog.image}
                      alt="Blog Thumbnail"
                      className="h-16 w-16 rounded-2xl object-cover shadow-md hover:scale-110 transition-all"
                    />
                    <span className="font-medium text-gray-900">
                      {blog.title}
                    </span>
                  </td>

                  <td className="p-4 text-gray-700 font-medium">
                    {blog.date}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${
                        blog.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white/80 border border-gray-200 rounded-3xl p-4 flex gap-4 shadow-md hover:shadow-lg transition-all backdrop-blur-xl"
            >
              <img
                src={blog.image}
                alt="Blog"
                className="h-20 w-20 rounded-2xl object-cover shadow"
              />

              <div className="flex-1">
                <p className="text-gray-900 font-bold text-lg">
                  #{blog.id}
                </p>
                <p className="font-semibold text-gray-800">
                  {blog.title}
                </p>
                <p className="text-gray-600 text-sm">
                  📅 {blog.date}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    blog.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {blog.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-6 flex justify-center">
          <NavLink
            to="/blog-list"
            className="px-8 py-2.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 hover:shadow-xl transition-all"
          >
            See More →
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
