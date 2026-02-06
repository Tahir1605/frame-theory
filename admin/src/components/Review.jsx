import { useState } from "react";
import {
  TrashIcon,
  StarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

/* ================= DEMO DATA ================= */
const allReviews = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@gmail.com`,
  rating: Math.floor(Math.random() * 2) + 4,
}));

const ITEMS_PER_PAGE = 5;

const Review = () => {
  const [reviews, setReviews] = useState(allReviews);
  const [currentPage, setCurrentPage] = useState(1);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    photo: null,
    photoPreview: null,
  });

  /* ================= IMAGE UPLOAD ================= */
  const handlePhotoUpload = (file) => {
    if (!file) return;

    setUploadProgress(0);
    setUploadDone(false);

    const previewURL = URL.createObjectURL(file);
    setForm({ ...form, photo: file, photoPreview: previewURL });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 8;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setUploadDone(true);
      }
    }, 120);
  };

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = reviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.rating) {
      alert("Fill all required fields");
      return;
    }

    setReviews([
      {
        id: reviews.length + 1,
        name: form.name,
        email: form.email,
        rating: form.rating,
      },
      ...reviews,
    ]);

    setForm({
      name: "",
      email: "",
      rating: 0,
      photo: null,
      photoPreview: null,
    });

    setUploadProgress(0);
    setUploadDone(false);
    setCurrentPage(1);
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
      setCurrentPage(1);
    }
  };

  return (
    <div className="mt-14 px-3 sm:px-6 max-w-7xl mx-auto">

      {/* ================= ADD REVIEW FORM ================= */}
      <div className="mb-12 bg-white rounded-2xl shadow-lg p-5 sm:p-7">
        <h3 className="text-xl sm:text-2xl font-bold mb-6">
          Add New Review
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            placeholder="Customer Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="Customer Email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* IMAGE UPLOAD */}
          <label
            className={`relative w-[120px] h-[120px] flex items-center justify-center rounded-xl cursor-pointer overflow-hidden
            ${
              uploadDone
                ? "border-4 border-blue-600"
                : "border-2 border-dashed border-blue-600"
            }`}
          >
            {form.photoPreview ? (
              <img
                src={form.photoPreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-blue-600">
                <PhotoIcon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">Upload</span>
              </div>
            )}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e.target.files[0])}
            />

            {uploadProgress > 0 && uploadProgress < 100 && (
              <>
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-semibold text-blue-600">
                  {uploadProgress}%
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </>
            )}
          </label>

          {/* RATING */}
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm({ ...form, rating: star })}
              >
                {form.rating >= star ? (
                  <StarSolid className="w-6 h-6 text-yellow-400" />
                ) : (
                  <StarIcon className="w-6 h-6 text-gray-300" />
                )}
              </button>
            ))}
          </div>

          <button className="md:col-span-2 cursor-pointer py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      </div>

      {/* ================= LIST (DESKTOP + MOBILE) ================= */}
      {/* Desktop Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-4 text-left">Customer</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4">Rating</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((r, i) => (
              <tr key={r.id} className={i % 2 ? "bg-gray-50" : ""}>
                <td className="px-4 py-3 font-semibold">{r.name}</td>
                <td className="px-4 py-3 text-gray-600 break-all">{r.email}</td>
                <td className="px-4 py-3">⭐ {r.rating}.0</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 cursor-pointer bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedReviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between gap-3"
          >
            <div>
              <h4 className="font-semibold">{r.name}</h4>
              <p className="text-sm text-gray-500 break-all">{r.email}</p>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) =>
                  r.rating >= star ? (
                    <StarSolid key={star} className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <StarIcon key={star} className="w-4 h-4 text-gray-300" />
                  )
                )}
              </div>
            </div>

            <button
              onClick={() => handleDelete(r.id)}
              className="p-2 cursor-pointer bg-red-50 text-red-600 rounded-lg h-fit"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`min-w-[38px] h-[38px] cursor-pointer rounded-lg font-semibold
                ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
