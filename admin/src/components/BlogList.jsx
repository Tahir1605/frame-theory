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

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [blogs, search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredBlogs.length / ROWS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id) => {
    if (window.confirm("Delete this blog?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setCurrentPage(1);
    }
  };

  /* ---------------- TOGGLE STATUS ---------------- */
  const togglePublish = (id) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, published: !b.published } : b
      )
    );
  };

  return (
    <div className="mt-14 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Blog List</h2>
          <p className="text-gray-500 text-sm">Manage all blogs</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base"
          />
        </div>
      </div>

      {/* ---------------- DESKTOP / TABLET TABLE ---------------- */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
          <thead className="bg-gray-50 text-sm sm:text-base">
            <tr>
              <th className="px-4 py-3 w-12 sm:w-16">SL</th>
              <th className="px-4 py-3">Blog Title</th>
              <th className="px-4 py-3 w-32 sm:w-40">Date</th>
              <th className="px-4 py-3 w-32 sm:w-40 text-center">Status</th>
              <th className="px-4 py-3 w-32 sm:w-40 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedBlogs.map((blog, i) => (
              <tr
                key={blog.id}
                className={`${i % 2 ? "bg-gray-50" : ""} hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-sm sm:text-base">
                  {(currentPage - 1) * ROWS_PER_PAGE + i + 1}
                </td>

                <td className="px-4 py-3 font-medium truncate max-w-[250px] sm:max-w-[400px] text-sm sm:text-base">
                  {blog.title}
                </td>

                <td className="px-4 py-3 text-gray-600 text-sm sm:text-base">
                  {blog.date}
                </td>

                <td className="px-4 py-3 text-center text-sm sm:text-base">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      blog.published
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {blog.published ? "Published" : "Unpublished"}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => togglePublish(blog.id)}
                      className="p-2 cursor-pointer rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      {blog.published ? (
                        <XCircleIcon className="w-5 h-5" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 cursor-pointer rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedBlogs.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-gray-400 text-sm sm:text-base"
                >
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- MOBILE CARDS ---------------- */}
      <div className="sm:hidden space-y-4 mt-4">
        {paginatedBlogs.map((blog, i) => (
          <div key={blog.id} className="bg-white rounded-xl p-4 shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                #{(currentPage - 1) * ROWS_PER_PAGE + i + 1}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  blog.published
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {blog.published ? "Published" : "Unpublished"}
              </span>
            </div>

            <h3 className="font-semibold text-sm sm:text-base">{blog.title}</h3>
            <p className="text-gray-500 text-xs sm:text-sm">{blog.date}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => togglePublish(blog.id)}
                className="flex-1 cursor-pointer py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm sm:text-base"
              >
                {blog.published ? "Unpublish" : "Publish"}
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="flex-1 cursor-pointer py-2 rounded-lg bg-red-50 text-red-600 font-semibold text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg cursor-pointer font-semibold text-sm sm:text-base ${
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
