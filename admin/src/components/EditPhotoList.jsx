import { useState, useMemo } from "react";
import { TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/* ================= DEMO DATA ================= */
const demoPhotos = [
  {
    id: 1,
    name: "Nature View",
    category: "Editing",
    beforeImg: "https://picsum.photos/800?1",
    afterImg: "https://picsum.photos/800?11",
  },
  {
    id: 2,
    name: "City Lights",
    category: "Editing",
    beforeImg: "https://picsum.photos/800?2",
    afterImg: "https://picsum.photos/800?12",
  },
  {
    id: 3,
    name: "Wedding Moment",
    category: "Editing",
    beforeImg: "https://picsum.photos/800?3",
    afterImg: "https://picsum.photos/800?13",
  },
  {
    id: 4,
    name: "Mountain Peak",
    category: "Editing",
    beforeImg: "https://picsum.photos/800?4",
    afterImg: "https://picsum.photos/800?14",
  },
  {
    id: 5,
    name: "Birthday Party",
    category: "Editing",
    beforeImg: "https://picsum.photos/800?5",
    afterImg: "https://picsum.photos/800?15",
  },
];

const ITEMS_PER_PAGE = 5;

/* ================= COMPONENT ================= */
const EditPhotoList = () => {
  const [photos, setPhotos] = useState(demoPhotos);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      setPhotos(photos.filter((item) => item.id !== id));
    }
  };

  const filteredPhotos = useMemo(() => {
    return photos.filter(
      (photo) =>
        photo.name.toLowerCase().includes(search.toLowerCase()) ||
        photo.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE);
  const paginatedPhotos = filteredPhotos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-14 px-3 sm:px-6 max-w-7xl mx-auto overflow-x-hidden">
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Edit Photo Library
          </h2>
          <p className="text-gray-500 mt-1">
            Manage before & after edited photos
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search photos..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-4 w-[90px]">Before</th>
              <th className="px-4 py-4 w-[90px]">After</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4 w-[120px]">Category</th>
              <th className="px-4 py-4 w-[90px] text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPhotos.map((photo, index) => (
              <tr
                key={photo.id}
                className={`${index % 2 ? "bg-gray-50" : ""} hover:bg-gray-100`}
              >
                {/* Before */}
                <td className="px-4 py-3">
                  <img
                    src={photo.beforeImg}
                    onClick={() =>
                      setSelectedPhoto({
                        name: `${photo.name} (Before)`,
                        img: photo.beforeImg,
                      })
                    }
                    className="w-14 h-14 rounded-lg object-cover cursor-pointer mx-auto"
                  />
                </td>

                {/* After */}
                <td className="px-4 py-3">
                  <img
                    src={photo.afterImg}
                    onClick={() =>
                      setSelectedPhoto({
                        name: `${photo.name} (After)`,
                        img: photo.afterImg,
                      })
                    }
                    className="w-14 h-14 rounded-lg object-cover cursor-pointer mx-auto"
                  />
                </td>

                <td className="px-4 py-3 font-semibold truncate">
                  {photo.name}
                </td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                    {photo.category}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 cursor-pointer rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="md:hidden space-y-4">
        {paginatedPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              <img
                src={photo.beforeImg}
                onClick={() =>
                  setSelectedPhoto({
                    name: `${photo.name} (Before)`,
                    img: photo.beforeImg,
                  })
                }
                className="h-36 w-full object-cover rounded-lg"
              />
              <img
                src={photo.afterImg}
                onClick={() =>
                  setSelectedPhoto({
                    name: `${photo.name} (After)`,
                    img: photo.afterImg,
                  })
                }
                className="h-36 w-full object-cover rounded-lg"
              />
            </div>

            <h3 className="font-bold">{photo.name}</h3>

            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
              {photo.category}
            </span>

            <button
              onClick={() => handleDelete(photo.id)}
              className="mt-4 cursor-pointer w-full py-2 rounded-lg bg-red-50 text-red-600 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ================= Modal ================= */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-5 max-w-5xl w-full"
          >
            <h3 className="text-xl font-bold mb-4">
              {selectedPhoto.name}
            </h3>

            {/* <div className="w-full h-[65vh] bg-black rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.img}
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
                className="px-6 cursor-pointer py-2 rounded-lg bg-gray-900 text-white"
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

export default EditPhotoList;
