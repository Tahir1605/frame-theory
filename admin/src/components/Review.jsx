import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const allReviews = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@gmail.com`,
  rating: 5,
}));

const Review = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [reviews, setReviews] = useState(allReviews);

  const handleDelete = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="mt-14 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Customer Reviews
        </h2>
        <p className="text-gray-500 mt-1">
          Feedback shared by customers
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-8 py-5 text-left">Customer</th>
              <th className="px-8 py-5 text-left">Email</th>
              <th className="px-8 py-5 text-left">Rating</th>
              <th className="px-8 py-5 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.slice(0, visibleCount).map((review, index) => (
              <tr
                key={review.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    {/* <div className="w-11 h-11 rounded-full bg-gradient-to from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div> */}
                    <span className="font-semibold text-gray-900">
                      {review.name}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-5 text-gray-600">
                  {review.email}
                </td>

                <td className="px-8 py-5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                    ⭐ {review.rating}.0
                  </span>
                </td>

                <td className="px-8 py-5 text-center">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                    title="Delete Review"
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
        {reviews.slice(0, visibleCount).map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 rounded-full bg-gradient-to from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                {review.name.charAt(0)}
              </div> */}
              <div>
                <h3 className="font-semibold text-gray-900">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {review.email}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                ⭐ {review.rating}.0
              </span>

              <button
                onClick={() => handleDelete(review.id)}
                className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < reviews.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((p) => p + 10)}
            className="px-10 py-3 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
