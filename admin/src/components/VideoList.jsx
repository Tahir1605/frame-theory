import { useState, useMemo } from "react";
import {
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const demoVideos = [
  {
    id: 1,
    title: "Wedding Highlight Film",
    category: "Films",
    link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: 2,
    title: "Fashion Modeling Shoot",
    category: "Films",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: 3,
    title: "Event After Movie",
    category: "Films",
    link: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  },
  {
    id: 4,
    title: "Corporate Promo Video",
    category: "Films",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    id: 5,
    title: "Travel Cinematic Film",
    category: "Films",
    link: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
];

const ITEMS_PER_PAGE = 5;

const VideoList = () => {
  const [videos, setVideos] = useState(demoVideos);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter((video) => video.id !== id));
    }
  };

  // 🔍 Search
  const filteredVideos = useMemo(() => {
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [videos, search]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-14 px-4 max-w-7xl mx-auto">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Video Library
          </h2>
          <p className="text-gray-500 mt-1">
            Manage uploaded films & videos
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-8 py-5 text-left">Video</th>
              <th className="px-8 py-5 text-left">Category</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedVideos.map((video, index) => (
              <tr
                key={video.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-gray-100 transition`}
              >
                <td className="px-8 py-5 font-semibold text-gray-900">
                  {video.title}
                </td>

                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {video.category}
                  </span>
                </td>

                <td className="px-8 py-5">
                  <div className="flex justify-center gap-3">
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition"
                      title="Watch Video"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </a>

                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                      title="Delete Video"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-4">
        {paginatedVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
          >
            <h3 className="font-semibold text-gray-900">
              {video.title}
            </h3>

            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {video.category}
            </span>

            <div className="mt-4 flex gap-3">
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition"
              >
                <EyeIcon className="w-5 h-5" />
                Show
              </a>

              <button
                onClick={() => handleDelete(video.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition cursor-pointer"
              >
                <TrashIcon className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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

export default VideoList;
