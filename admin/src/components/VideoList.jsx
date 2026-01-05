import { useState } from "react";
import { TrashIcon, EyeIcon, FilmIcon } from "@heroicons/react/24/outline";

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

const VideoList = () => {
  const [videos, setVideos] = useState(demoVideos);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter((video) => video.id !== id));
    }
  };

  return (
    <div className="mt-14 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Video Library
        </h2>
        <p className="text-gray-500 mt-1">
          Manage uploaded films & videos
        </p>
      </div>

      {/* Desktop Table */}
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
            {videos.map((video, index) => (
              <tr
                key={video.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } hover:bg-gray-100 transition`}
              >
                {/* Title */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    {/* <div className="w-11 h-11 rounded-xl bg-gradient-to from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                      <FilmIcon className="w-6 h-6" />
                    </div> */}
                    <span className="font-semibold text-gray-900">
                      {video.title}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {video.category}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-8 py-5">
                  <div className="flex justify-center gap-3">
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition cursor-pointer"
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 rounded-xl bg-gradient-to from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <FilmIcon className="w-5 h-5" />
              </div> */}
              <div>
                <h3 className="font-semibold text-gray-900">
                  {video.title}
                </h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {video.category}
                </span>
              </div>
            </div>

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
    </div>
  );
};

export default VideoList;
