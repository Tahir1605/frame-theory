import { useState } from "react";
import { TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";

const demoPhotos = [
  { id: 1, name: "Nature View", category: "Photo", img: "https://picsum.photos/200?1" },
  { id: 2, name: "City Lights", category: "Event", img: "https://picsum.photos/200?2" },
  { id: 3, name: "Wedding Moment", category: "Event", img: "https://picsum.photos/200?3" },
  { id: 4, name: "Mountain Peak", category: "Photo", img: "https://picsum.photos/200?4" },
  { id: 5, name: "Birthday Party", category: "Event", img: "https://picsum.photos/200?5" },
  { id: 6, name: "Sunset Beach", category: "Photo", img: "https://picsum.photos/200?6" },
  { id: 7, name: "Office Meet", category: "Event", img: "https://picsum.photos/200?7" },
  { id: 8, name: "Wildlife Shot", category: "Photo", img: "https://picsum.photos/200?8" },
  { id: 9, name: "Concert Night", category: "Event", img: "https://picsum.photos/200?9" },
  { id: 10, name: "Street Life", category: "Photo", img: "https://picsum.photos/200?10" },
];

const PhotoList = () => {
  const [photos, setPhotos] = useState(demoPhotos);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      setPhotos(photos.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="mt-14 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Photo Library
        </h2>
        <p className="text-gray-500 mt-1">
          Manage uploaded photos & events
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-8 py-5 text-left">Photo</th>
              <th className="px-8 py-5 text-left">Name</th>
              <th className="px-8 py-5 text-left">Category</th>
              <th className="px-8 py-5 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {photos.map((photo, index) => (
              <tr
                key={photo.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } hover:bg-gray-100 transition`}
              >
                {/* Photo */}
                <td className="px-8 py-5">
                  <img
                    src={photo.img}
                    alt={photo.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md"
                  />
                </td>

                {/* Name */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to from-indigo-600 to-blue-600 flex items-center justify-center text-white">
                      <PhotoIcon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-900">
                      {photo.name}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-8 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        photo.category === "Photo"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }
                    `}
                  >
                    {photo.category}
                  </span>
                </td>

                {/* Action */}
                <td className="px-8 py-5 text-center">
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                    title="Delete Photo"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
          >
            <img
              src={photo.img}
              alt={photo.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h3 className="text-lg font-bold text-gray-900">
              {photo.name}
            </h3>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                ${
                  photo.category === "Photo"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }
              `}
            >
              {photo.category}
            </span>

            <button
              onClick={() => handleDelete(photo.id)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition cursor-pointer"
            >
              <TrashIcon className="w-5 h-5" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
