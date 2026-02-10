import { useState, useMemo } from "react";
import {
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
 
/* ---------------- DEMO BLOG DATA ---------------- */
const demoBlogs = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  title: `Sample Blog Title ${i + 1}`,
  date: "12 Jan 2026",
  published: i % 2 === 0,
}));

const ROWS_PER_PAGE = 5;

const BlogList = () => {
  const [blogs, setBlogs] = useState(demoBlogs);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- SEARCH ---------------- */
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [blogs, search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredBlogs.length / ROWS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  /* ---------------- ACTIONS ---------------- */
  const handleDelete = (id) => {
    if (window.confirm("Delete this blog?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setCurrentPage(1);
    }
  };

  const togglePublish = (id) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, published: !b.published } : b
      )
    );
  };

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Blog List</h2>
          <p className="text-gray-500 text-sm">Manage all blogs</p>
        </div>

        <div className="relative w-full sm:w-64">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search blog..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* ================= TABLE (TABLETS & DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-hidden">
        <table className="w-full table-fixed bg-white rounded-xl shadow">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-2 py-3 w-10">SL</th>
              <th className="px-3 py-3 text-left">Title</th>

              {/* Date hidden on tablets */}
              <th className="px-3 py-3 hidden lg:table-cell">
                Date
              </th>

              {/* Status hidden on small tablets */}
              <th className="px-3 py-3 text-center hidden sm:table-cell">
                Status
              </th>

              <th className="px-2 py-3 text-center w-20">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {paginatedBlogs.map((blog, i) => (
              <tr
                key={blog.id}
                className={`${i % 2 ? "bg-gray-50" : ""} hover:bg-gray-100`}
              >
                <td className="px-2 py-2">
                  {(currentPage - 1) * ROWS_PER_PAGE + i + 1}
                </td>

                <td className="px-3 py-2 font-medium truncate">
                  {blog.title}
                </td>

                <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                  {blog.date}
                </td>

                <td className="px-3 py-2 text-center hidden sm:table-cell">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      blog.published
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {blog.published ? "Pub" : "Unpub"}
                  </span>
                </td>

                <td className="px-2 py-2">
                  <div className="flex justify-center gap-0.5">
                    <button
                      onClick={() => togglePublish(blog.id)}
                      className="cursor-pointer p-1.5 rounded-md bg-blue-50 text-blue-600"
                    >
                      {blog.published ? (
                        <XCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="cursor-pointer p-1.5 rounded-md bg-red-50 text-red-600"
                    >
                      <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedBlogs.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {paginatedBlogs.map((blog, i) => (
          <div key={blog.id} className="bg-white rounded-xl p-4 shadow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">
                #{(currentPage - 1) * ROWS_PER_PAGE + i + 1}
              </span>

              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  blog.published
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {blog.published ? "Published" : "Unpublished"}
              </span>
            </div>

            <h3 className="font-semibold text-sm truncate">
              {blog.title}
            </h3>
            <p className="text-xs text-gray-500">{blog.date}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => togglePublish(blog.id)}
                className="cursor-pointer flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold"
              >
                {blog.published ? "Unpublish" : "Publish"}
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="cursor-pointer flex-1 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
