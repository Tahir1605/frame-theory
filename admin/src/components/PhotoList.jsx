import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

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
    <div className="mt-16 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Photo List
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {photos.map((photo) => (
              <tr
                key={photo.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={photo.img}
                    alt={photo.name}
                    className="w-16 h-16 rounded-xl object-cover shadow"
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-gray-700">
                  {photo.name}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        photo.category === "Photo"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }
                    `}
                  >
                    {photo.category}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
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
      <div className="md:hidden space-y-5">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
          >
            <img
              src={photo.img}
              alt={photo.name}
              className="w-full h-44 object-cover rounded-xl mb-4"
            />

            <h3 className="text-lg font-bold text-gray-800">
              {photo.name}
            </h3>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                ${
                  photo.category === "Photo"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                }
              `}
            >
              {photo.category}
            </span>

            <button
              onClick={() => handleDelete(photo.id)}
              className="mt-4 w-full py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
