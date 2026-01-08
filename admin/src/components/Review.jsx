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

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
    photo: null,
  });

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
    });
  };

  return (
    <div className="mt-14 px-3 sm:px-6 max-w-7xl mx-auto overflow-x-hidden">

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
            className="px-4 py-2.5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Customer Email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border-dashed border-blue-600 bg-gray-100 cursor-pointer md:col-span-1">
            <PhotoIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm">Upload Customer Photo</span>
            <input
              type="file"
              hidden
              onChange={(e) =>
                setForm({ ...form, photo: e.target.files[0] })
              }
            />
          </label>

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

          <button className="md:col-span-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Submit Review
          </button>
        </form>
      </div>

      {/* ================= HEADER + SEARCH ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Customer Reviews
          </h2>
          <p className="text-gray-500">
            Feedback shared by customers
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full table-fixed">
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
                <td className="px-4 py-3 font-semibold truncate">
                  {r.name}
                </td>
                <td className="px-4 py-3 text-gray-600 truncate">
                  {r.email}
                </td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    ⭐ {r.rating}.0
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(r.id)}
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

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {paginatedReviews.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between gap-2">
              <div>
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-gray-500 break-all">
                  {r.email}
                </p>
              </div>
              <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full h-fit">
                ⭐ {r.rating}.0
              </span>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDelete(r.id)}
                className="p-2 cursor-pointer bg-red-50 text-red-600 rounded-lg"
              >
                <TrashIcon className="w-4 h-4" />
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
              className={`px-4 cursor-pointer py-2 rounded-lg font-semibold ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
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

export default Review;
