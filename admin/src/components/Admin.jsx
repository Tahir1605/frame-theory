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
  } = useForm({
    mode: "onSubmit", // ✅ VALIDATE ONLY ON SUBMIT
  });

  // Image Upload Handler
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

  // Submit Success
  const onSubmit = (data) => {
    if (!image) {
      toast.error("Please upload admin photo");
      return;
    }

    console.log(data); // demo purpose
    toast.success("Admin created successfully 🎉");

    reset();
    setImage(null);
    setProgress(0);
  };

  // Submit Error (ONLY ONE TOAST)
  const onError = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  return (
    <div className="px-4 py-6 space-y-16">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ADD ADMIN FORM */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-100 p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Add New Admin
          </h2>
          <p className="text-gray-500 mb-8">
            Create a new admin account with profile details
          </p>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Profile Upload */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="relative">
                {image ? (
                  <img
                    src={image}
                    alt="admin"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-dashed border-blue-400 flex flex-col items-center justify-center text-blue-500 bg-blue-50">
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

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter admin name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Name cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "No numbers or special characters allowed",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message:
                      "Must contain uppercase, lowercase, number & special character",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full cursor-pointer py-3 rounded-xl bg-blue-600 text-white 
                font-semibold text-lg hover:scale-[1.02] hover:shadow-xl 
                transition-all duration-300"
              >
                Create Admin
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ADMIN LIST */}
      <AdminList />
    </div>
  );
};

export default Admin;
