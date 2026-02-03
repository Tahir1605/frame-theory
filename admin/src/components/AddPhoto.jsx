import { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";

const AddPhoto = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setImage(URL.createObjectURL(file));

    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setUploading(false);
      }
    }, 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Photo uploaded successfully ✅");
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-100 p-8 sm:p-10">
        
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Add New Photo
        </h2>
        <p className="text-gray-500 mb-8">
          Upload photo with details
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt="preview"
                  className="w-36 h-36 rounded-2xl object-cover border-4 border-blue-500 shadow-lg"
                />
              ) : (
                <div className="w-36 h-36 rounded-full border-4 border-dashed border-blue-400 flex flex-col items-center justify-center bg-blue-50 text-blue-500">
                  <CameraIcon className="w-10 h-10 mb-2" />
                  <span className="text-sm font-semibold">
                    Upload Photo
                  </span>
                </div>
              )}

              <label
                htmlFor="photo"
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
              >
                <CameraIcon className="w-5 h-5" />
              </label>

              <input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Progress */}
            {uploading && (
              <div className="w-44 mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Uploading {progress}%
                </p>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Photo Name
            </label>
            <input
              type="text"
              placeholder="Enter photo name"
              required
              className="
                w-full px-4 py-3 rounded-xl border border-gray-300
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                focus:outline-none transition
              "
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              required
              className="
                w-full px-4 py-3 rounded-xl border border-gray-300
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                focus:outline-none transition
              "
            >
              <option value="">Select category</option>
              <option value="photo">Photo</option>
              <option value="event">Event</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl bg-blue-600 text-white
              font-semibold text-lg cursor-pointer
              hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02]
              transition-all duration-300
            "
          >
            Upload Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPhoto;
