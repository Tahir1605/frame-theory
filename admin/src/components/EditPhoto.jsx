import { useState } from "react";
import {
  PhotoIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const EditPhoto = () => {
  const [form, setForm] = useState({
    name: "",
    category: "Wedding",
    beforePhoto: null,
    afterPhoto: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.beforePhoto || !form.afterPhoto) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Form Data:", form);
    alert("Photo updated successfully (UI only)");
  };

  return (
    <div className="mt-16 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Edit Photo
        </h2>
        <p className="text-gray-500 mt-1">
          Upload before & after edited photos
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Photo Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Photo Name *
            </label>
            <input
              type="text"
              placeholder="Enter photo name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Category (Disabled) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              disabled
              value={form.category}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
            >
              <option>Editing</option>
            </select>
          </div>

          {/* Before Edit Photo */}
          <label className="flex flex-col items-center justify-center gap-3 px-6 py-8 rounded-2xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition">
            <PhotoIcon className="w-10 h-10 text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">
              Upload Before Edit Photo *
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setForm({ ...form, beforePhoto: e.target.files[0] })
              }
            />
            {form.beforePhoto && (
              <span className="text-xs text-green-600 font-medium">
                {form.beforePhoto.name}
              </span>
            )}
          </label>

          {/* After Edit Photo */}
          <label className="flex flex-col items-center justify-center gap-3 px-6 py-8 rounded-2xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition">
            <PhotoIcon className="w-10 h-10 text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">
              Upload After Edit Photo *
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setForm({ ...form, afterPhoto: e.target.files[0] })
              }
            />
            {form.afterPhoto && (
              <span className="text-xs text-green-600 font-medium">
                {form.afterPhoto.name}
              </span>
            )}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            Update Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPhoto;
