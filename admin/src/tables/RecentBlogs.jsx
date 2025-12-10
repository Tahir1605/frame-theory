import React from "react";
import { NavLink } from "react-router-dom";

const RecentBlogs = () => {
  const categories = ["Tech", "Travel", "News", "Fashion", "Lifestyle"];

  const images = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=200&q=80",
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
              <tr className="text-left bg-gray-200 text-gray-700 rounded-md">
                <th className="p-4 font-semibold text-sm">SL No.</th>
                <th className="p-4 font-semibold text-sm">Blog</th>
                <th className="p-4 font-semibold text-sm">Category</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((num, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50/80 transition-all duration-300"
                >
                  <td className="p-4 font-semibold text-gray-900">{num}</td>

                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={images[i]}
                      alt="Blog Thumbnail"
                      className="h-16 w-16 rounded-2xl object-cover shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300"
                    />
                    <span className="font-medium text-gray-900">
                      Sample Blog Title {num}
                    </span>
                  </td>

                  <td className="p-4 text-gray-700 font-medium">
                    {categories[i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {[1, 2, 3, 4, 5].map((num, i) => (
            <div
              key={i}
              className="bg-white/80 border border-gray-200 rounded-3xl p-4 flex gap-4 shadow-md hover:shadow-lg transition-all backdrop-blur-xl"
            >
              <img
                src={images[i]}
                alt="Blog"
                className="h-20 w-20 rounded-2xl object-cover shadow"
              />

              <div>
                <p className="text-gray-900 font-bold text-lg">#{num}</p>
                <p className="font-semibold text-gray-800">
                  Sample Blog Title {num}
                </p>
                <p className="text-gray-600 text-sm font-medium">{categories[i]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-6 flex justify-center">
          <NavLink
            to="/blog-list"
            className="px-8 py-2.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-xl hover:bg-blue-700 transition-all"
          >
            See More →
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
