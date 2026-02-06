import React from "react";
const AddVideo = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-12">
      
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-7 sm:p-9">
        
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          Upload New Video
        </h2>

        {/* Form */}
        <form className="space-y-6">

          {/* Video Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Video Name
            </label>
            <input
              type="text"
              placeholder="Enter video title"
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-sm"
            />
          </div>

          {/* Video Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              YouTube Video Link
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/..."
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              disabled
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed text-sm"
            >
              <option>Films</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold text-lg shadow-md hover:shadow-xl cursor-pointer transition-all"
            >
              Upload Video
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddVideo;
