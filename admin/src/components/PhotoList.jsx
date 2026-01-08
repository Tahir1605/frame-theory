import { useState, useMemo } from "react";
import {
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const demoPhotos = [
  { id: 1, name: "Nature View", category: "Photo", img: "https://picsum.photos/800?1" },
  { id: 2, name: "City Lights", category: "Event", img: "https://picsum.photos/800?2" },
  { id: 3, name: "Wedding Moment", category: "Event", img: "https://picsum.photos/800?3" },
  { id: 4, name: "Mountain Peak", category: "Photo", img: "https://picsum.photos/800?4" },
  { id: 5, name: "Birthday Party", category: "Event", img: "https://picsum.photos/800?5" },
  { id: 6, name: "Sunset Beach", category: "Photo", img: "https://picsum.photos/800?6" },
  { id: 7, name: "Office Meet", category: "Event", img: "https://picsum.photos/800?7" },
  { id: 8, name: "Wildlife Shot", category: "Photo", img: "https://picsum.photos/800?8" },
  { id: 9, name: "Concert Night", category: "Event", img: "https://picsum.photos/800?9" },
  { id: 10, name: "Street Life", category: "Photo", img: "https://picsum.photos/800?10" },
];

const ITEMS_PER_PAGE = 5;

const PhotoList = () => {
  const [photos, setPhotos] = useState(demoPhotos);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Delete this photo?")) {
      setPhotos(photos.filter((p) => p.id !== id));
    }
  };

  const filteredPhotos = useMemo(() => {
    return photos.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE);
  const paginatedPhotos = filteredPhotos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-14 px-3 sm:px-6 max-w-7xl mx-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Photo Library</h2>
          <p className="text-gray-500 text-sm">Manage uploaded photos</p>
        </div>

        <div className="relative w-full sm:w-64">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden sm:block bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 w-[110px]">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 w-[110px]">Category</th>
              <th className="px-4 py-3 w-[110px] text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPhotos.map((photo, i) => (
              <tr
                key={photo.id}
                className={`${i % 2 ? "bg-gray-50" : ""} hover:bg-gray-100`}
              >
                <td className="px-4 py-3">
                  <img
                    src={photo.img}
                    alt={photo.name}
                    className="w-14 h-14 rounded-xl object-cover mx-auto"
                  />
                </td>

                <td className="px-4 py-3 font-medium truncate">
                  {photo.name}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${photo.category === "Photo"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                      }`}
                  >
                    {photo.category}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="p-2 cursor-pointer rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="p-2 cursor-pointer rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {paginatedPhotos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-xl p-4 shadow">
            <img
              src={photo.img}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold">{photo.name}</h3>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedPhoto(photo)}
                className="flex-1 cursor-pointer py-2 rounded-lg bg-indigo-50 text-indigo-600 font-semibold"
              >
                View
              </button>

              <button
                onClick={() => handleDelete(photo.id)}
                className="flex-1 cursor-pointer py-2 rounded-lg bg-red-50 text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 cursor-pointer py-2 rounded-lg font-semibold ${currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-5 max-w-4xl w-full"
          >
            <h3 className="text-xl font-bold mb-4">
              {selectedPhoto.name}
            </h3>

            {/* <div className="w-full h-[60vh] bg-black rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.img}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div> */}

            <div
              className="w-full h-[65vh] md:h-[70vh]
              flex items-center justify-center
            bg-gray-900 rounded-2xl md:rounded-3xl
              overflow-hidden border border-gray-200"
            >
              <img
                src={selectedPhoto.img}
                alt={selectedPhoto.name}
                className="w-full h-full object-cover"
              />
            </div>


            <div className="mt-5 text-center">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-6 cursor-pointer py-2 rounded-lg bg-gray-900 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoList;
