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
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
    photo: null,
    photoPreview: null,
  });

  /* ================= IMAGE UPLOAD (WITH %) ================= */
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

  /* ================= SEARCH ================= */
  const filteredReviews = reviews.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
      setCurrentPage(1);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.rating) {
      alert("Please fill all required fields");
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
      comment: "",
      photo: null,
      photoPreview: null,
    });
    setUploadProgress(0);
    setUploadDone(false);
  };

  return (
    <div className="mt-14 px-3 sm:px-6 max-w-7xl mx-auto">

      {/* ================= ADD REVIEW ================= */}
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
            className="px-4 py-2.5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Customer Email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* ===== SMALL IMAGE UPLOAD BOX ===== */}
          <div>
            <label
              className={`relative flex items-center justify-center
              w-[120px] h-[120px] rounded-xl cursor-pointer overflow-hidden
              ${
                uploadDone
                  ? "border-4 border-blue-600"
                  : "border-2 border-dashed border-blue-600"
              }`}
            >
              {form.photoPreview ? (
                <img
                  src={form.photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="cursor-pointer flex flex-col items-center text-blue-600">
                  <PhotoIcon className="w-6 h-6" />
                  <span className="text-[11px] mt-1 font-medium">
                    Upload
                  </span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handlePhotoUpload(e.target.files[0])}
              />

              {/* Percentage */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-semibold text-blue-600">
                  {uploadProgress}%
                </div>
              )}

              {/* Progress bar */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </label>
          </div>

          {/* ===== RATING ===== */}
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

          <textarea
            placeholder="Customer Comment"
            rows="4"
            className="md:col-span-2 px-4 py-2.5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="cursor-pointer md:col-span-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Submit Review
          </button>
        </form>
      </div>

      {/* ================= REVIEWS TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-4 text-left">Customer</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4 w-[120px]">Rating</th>
              <th className="px-4 py-4 w-[90px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((r, i) => (
              <tr key={r.id} className={i % 2 ? "bg-gray-50" : ""}>
                <td className="px-4 py-3 font-semibold">{r.name}</td>
                <td className="px-4 py-3 text-gray-600">{r.email}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    ⭐ {r.rating}.0
                  </span>
                </td>
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
    </div>
  );
};

export default Review;
