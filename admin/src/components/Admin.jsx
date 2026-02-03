import { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminList from "./AdminList";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

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
    }, 200);
  };

  const onSubmit = (data) => {
    if (!image) {
      toast.error("Please upload admin photo");
      return;
    }

    toast.success("Admin created successfully 🎉");
    reset();
    setImage(null);
    setProgress(0);
  };

  const onError = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) toast.error(firstError.message);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-3 sm:px-6 py-6 space-y-16">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ================= ADD ADMIN ================= */}
      <div className="flex justify-center">
        <div className="w-full lg:max-w-4xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-1">
            Add New Admin
          </h2>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            Create a new admin account with profile details
          </p>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Profile Upload */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <div className="relative">
                {image ? (
                  <img
                    src={image}
                    alt="admin"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-dashed border-blue-400 flex flex-col items-center justify-center text-blue-500 bg-blue-50">
                    <CameraIcon className="w-8 h-8 mb-1" />
                    <span className="text-xs font-semibold">Upload Photo</span>
                  </div>
                )}

                <label
                  htmlFor="photo"
                  className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
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

              {uploading && (
                <div className="w-40 mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Uploading {progress}%
                  </p>
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 20, message: "Maximum 20 characters" },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters allowed",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Submit */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="cursor-pointer w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:shadow-xl hover:scale-[1.01] transition"
              >
                Create Admin
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= ADMIN LIST ================= */}
      <div className="w-full overflow-x-hidden">
        <AdminList />
      </div>
    </div>
  );
};

export default Admin;
