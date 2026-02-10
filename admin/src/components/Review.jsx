import { useState } from "react";
import {
  TrashIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid, StarIcon } from "@heroicons/react/24/solid";

/* ================= DEMO DATA ================= */
const allReviews = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@gmail.com`,
  rating: Math.floor(Math.random() * 2) + 4,
  published: Math.random() > 0.5, // ✅ IMPORTANT
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

  /* ================= TOGGLE PUBLISH ================= */
  const togglePublish = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, published: !r.published } : r
      )
    );
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
        published: false, // ✅ default unpublished
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
            className="px-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="Customer Email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* IMAGE */}
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
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center font-semibold text-blue-600">
                {uploadProgress}%
              </div>
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

          <button className="md:col-span-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="w-full table-fixed bg-white rounded-xl shadow">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="w-10 px-2 py-3">SL</th>
              <th className="px-3 py-3 text-left">Name</th>
              <th className="px-3 py-3 hidden lg:table-cell">Email</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="w-20 px-2 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {paginatedReviews.map((review, i) => (
              <tr key={review.id} className="hover:bg-gray-100">
                <td className="px-2 py-2">
                  {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                </td>

                <td className="px-3 py-2 font-medium truncate">
                  {review.name}
                </td>

                <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                  {review.email}
                </td>

                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      review.published
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {review.published ? "Published" : "Unpublished"}
                  </span>
                </td>

                <td className="px-2 py-2">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => togglePublish(review.id)}
                      className="p-1.5 rounded-md bg-blue-50 text-blue-600"
                    >
                      {review.published ? (
                        <XCircleIcon className="w-5 h-5" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-1.5 rounded-md bg-red-50 text-red-600"
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

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-4">
        {paginatedReviews.map((review, i) => (
          <div key={review.id} className="bg-white rounded-xl p-4 shadow">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">
                #{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
              </span>

              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  review.published
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {review.published ? "Published" : "Unpublished"}
              </span>
            </div>

            <h3 className="font-semibold text-sm truncate">
              {review.name}
            </h3>
            <p className="text-xs text-gray-500">{review.email}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => togglePublish(review.id)}
                className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold"
              >
                {review.published ? "Unpublish" : "Publish"}
              </button>

              <button
                onClick={() => handleDelete(review.id)}
                className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg font-semibold ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
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

export default Review;
