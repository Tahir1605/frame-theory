import { useState } from "react";
import { useForm } from "react-hook-form";
import { CameraIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import axios from "axios";
import AdminList from "./AdminList";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  /* ================= IMAGE SELECT + PROGRESS ================= */
  const handleImageSelect = (file) => {
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadProgress(0);
    setUploadDone(false);

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

  /* ================= SUBMIT ================= */
  const onSubmitHandler = async (data) => {
    if (!image) {
      toast.error("Profile image is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3000/api/admin/add-admin",
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        setImage(null);
        setImagePreview(null);
        setUploadProgress(0);
        setUploadDone(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  /* ================= SHOW VALIDATION ERRORS IN TOAST ================= */
  const onError = (errors) => {
    Object.values(errors).forEach((err) => {
      toast.error(err.message);
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-3 sm:px-6 py-6 space-y-16">

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
            onSubmit={handleSubmit(onSubmitHandler, onError)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* ================= PROFILE UPLOAD ================= */}
            <div className="lg:col-span-2 flex flex-col items-center gap-3">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="admin"
                    className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg
                    ${
                      uploadDone
                        ? "border-4 border-blue-600"
                        : "border-2 border-dashed border-blue-500"
                    }`}
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-blue-400 flex flex-col items-center justify-center text-blue-500 bg-blue-50">
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
                  hidden
                  onChange={(e) => handleImageSelect(e.target.files[0])}
                />
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-40">
                  <div className="text-xs font-semibold text-blue-600 text-center mb-1">
                    Uploading {uploadProgress}%
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ================= NAME ================= */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Name must not contain numbers or special characters",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

            {/* ================= EMAIL ================= */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message:
                      "Password must contain uppercase, lowercase, number and special character",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

            {/* ================= SUBMIT ================= */}
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
