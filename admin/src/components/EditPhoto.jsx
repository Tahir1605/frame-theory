import { useState } from "react";
import {
  PhotoIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const EditPhoto = () => {
  const [form, setForm] = useState({
    name: "",
    category: "Editing",
    beforePhoto: null,
    afterPhoto: null,
  });

  const [preview, setPreview] = useState({
    before: null,
    after: null,
  });

  const [progress, setProgress] = useState({
    before: 0,
    after: 0,
  });

  const [uploading, setUploading] = useState({
    before: false,
    after: false,
  });

  // Simulate upload with preview
  const simulateUpload = (type, file) => {
    if (!file) return;

    setUploading((p) => ({ ...p, [type]: true }));
    setProgress((p) => ({ ...p, [type]: 0 }));
    setPreview((p) => ({
      ...p,
      [type]: URL.createObjectURL(file),
    }));

    setForm((p) => ({
      ...p,
      [type === "before" ? "beforePhoto" : "afterPhoto"]: file,
    }));

    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress((p) => ({ ...p, [type]: value }));

      if (value >= 100) {
        clearInterval(interval);
        setUploading((p) => ({ ...p, [type]: false }));
      }
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.beforePhoto || !form.afterPhoto) {
      alert("Please fill all required fields");
      return;
    }

    alert("Photo updated successfully (UI only)");
    console.log(form);
  };

  // Border logic
  const getBorderClass = (type) => {
    if (uploading[type])
      return "border-dashed border-blue-600";
    if (progress[type] === 100)
      return "border-4 border-dashed border-blue-600";
    return "border-dashed border-blue-600";
  };

  return (
    <div className="mt-16 px-4 max-w-4xl mx-auto w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Edit Photo
        </h2>
        <p className="text-gray-500 mt-1">
          Upload before & after edited photos
        </p>
      </div>

      {/* Card */}
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

          {/* Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              disabled
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
            >
              <option>Editing</option>
            </select>
          </div>

          {/* BEFORE */}
          <label
            className={`relative flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-2xl cursor-pointer transition
            border-2 ${getBorderClass("before")}`}
          >
            {preview.before ? (
              <img
                src={preview.before}
                alt="Before Preview"
                className="h-40 w-full object-cover rounded-xl"
              />
            ) : (
              <>
                <PhotoIcon className="w-10 h-10 text-gray-400" />
                <span className="text-sm font-semibold text-gray-600">
                  Upload Before Edit *
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                simulateUpload("before", e.target.files[0])
              }
            />

            {uploading.before && (
              <div className="absolute bottom-3 left-4 right-4">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${progress.before}%` }}
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">
                  Uploading {progress.before}%
                </p>
              </div>
            )}
          </label>

          {/* AFTER */}
          <label
            className={`relative flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-2xl cursor-pointer transition
            border-2 ${getBorderClass("after")}`}
          >
            {preview.after ? (
              <img
                src={preview.after}
                alt="After Preview"
                className="h-40 w-full object-cover rounded-xl"
              />
            ) : (
              <>
                <PhotoIcon className="w-10 h-10 text-gray-400" />
                <span className="text-sm font-semibold text-gray-600">
                  Upload After Edit *
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                simulateUpload("after", e.target.files[0])
              }
            />

            {uploading.after && (
              <div className="absolute bottom-3 left-4 right-4">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${progress.after}%` }}
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">
                  Uploading {progress.after}%
                </p>
              </div>
            )}
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer md:col-span-2 flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
