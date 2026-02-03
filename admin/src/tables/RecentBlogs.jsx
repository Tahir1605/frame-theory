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

      <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-xl border border-gray-200">
        {/* ================= TABLE (md+) ================= */}
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-3 w-14">#</th>
                <th className="p-3 text-left">Blog</th>
                <th className="p-3 w-32 hidden lg:table-cell">
                  Date
                </th>
                <th className="p-3 w-28 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-semibold">{blog.id}</td>

                  {/* Blog title + image (compact for iPad) */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={blog.image}
                        alt="Blog"
                        className="h-10 w-10 rounded-xl object-cover shadow hidden lg:block"
                      />
                      <span className="font-medium text-gray-900 line-clamp-1">
                        {blog.title}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 hidden lg:table-cell text-gray-600">
                    {blog.date}
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl p-4 flex gap-4 shadow-md"
            >
              <img
                src={blog.image}
                alt="Blog"
                className="h-20 w-20 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <p className="text-xs text-gray-500 font-semibold">
                  #{blog.id}
                </p>
                <p className="font-semibold text-gray-900">
                  {blog.title}
                </p>
                <p className="text-sm text-gray-500">
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

        {/* ================= SEE MORE ================= */}
        <div className="mt-6 flex justify-center">
          <NavLink
            to="/blog-list"
            className="px-8 py-2.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition"
          >
            See More →
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
