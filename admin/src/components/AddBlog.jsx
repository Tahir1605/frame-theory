import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import axios from "axios";
import { X } from "lucide-react";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [images, setImages] = useState([null, null, null, null]);
  const [title, setTitle] = useState("");
  const [subTitles, setSubTitles] = useState([""]); // Array for multiple sub-titles
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  /* ---------------- COMMON INPUT STYLE ---------------- */
  const inputStyle =
    "w-full mt-1 p-3 border-2 border-blue-600 rounded-lg outline-none " +
    "focus:ring-2 focus:ring-blue-500 transition";

  /* ---------------- INIT QUILL ---------------- */
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write blog content here...",
      });
    }
  }, []);

  /* ---------------- IMAGE HANDLERS ---------------- */
  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  /* ---------------- SUB-TITLE HANDLERS ---------------- */
  const handleSubTitleChange = (index, value) => {
    const updated = [...subTitles];
    updated[index] = value;
    setSubTitles(updated);
  };

  const addSubTitle = () => {
    setSubTitles([...subTitles, ""]);
  };

  const removeSubTitle = (index) => {
    if (subTitles.length === 1) return; // At least one sub-title
    const updated = subTitles.filter((_, i) => i !== index);
    setSubTitles(updated);
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!images.some((img) => img)) {
      return toast.error("At least one image is required");
    }

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitles: subTitles.filter((st) => st.trim() !== ""), // Only non-empty sub-titles
        description: quillRef.current.root.innerHTML,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));

      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImages([null, null, null, null]);
        setTitle("");
        setSubTitles([""]);
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-5 md:p-8 space-y-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          📝 Add New Blog
        </h2>

        {/* ---------------- IMAGES ---------------- */}
        <div>
          <p className="text-sm font-medium mb-3">Blog Images (Max 4)</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative h-28 rounded-xl border-2 border-dashed border-blue-600
                           hover:bg-blue-50 transition flex items-center justify-center
                           overflow-hidden bg-gray-100"
              >
                {img ? (
                  <>
                    <img
                      src={URL.createObjectURL(img)}
                      className="h-full w-full object-cover"
                      alt="Preview"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer text-xs text-blue-600 flex flex-col items-center">
                    <span>Upload</span>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- TITLE ---------------- */}
        <div>
          <label className="text-sm font-medium">Blog Title</label>
          <input
            className={inputStyle}
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* ---------------- SUB-TITLES ---------------- */}
        <div>
          <label className="text-sm font-medium mb-2">Sub Titles</label>
          <div className="space-y-2">
            {subTitles.map((st, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Sub Title ${index + 1}`}
                  className={inputStyle}
                  value={st}
                  onChange={(e) => handleSubTitleChange(index, e.target.value)}
                  required
                />
                {subTitles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubTitle(index)}
                    className="text-white cursor-pointer bg-red-600 hover:bg-red-700 rounded-lg px-3 py-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSubTitle}
            className="mt-2 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
          >
            + Add Sub Title
          </button>
        </div>

        {/* ---------------- DESCRIPTION ---------------- */}
        <div>
          <label className="text-sm font-medium">Blog Description</label>

          <div
            className="relative mt-2 border-2 border-blue-600 rounded-xl
                       focus-within:ring-2 focus-within:ring-blue-500
                       transition bg-white"
          >
            <div ref={editorRef} className="min-h-[300px] pb-16" />

            <button
              type="button"
              className="absolute bottom-3 right-3 text-xs cursor-pointer
                         px-4 py-2 rounded-lg bg-black/80 text-white
                         hover:bg-black transition"
            >
              Generate with AI
            </button>
          </div>
        </div>

        {/* ---------------- PUBLISH ---------------- */}
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            className="scale-125 cursor-pointer accent-blue-600"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publish now
        </label>

        {/* ---------------- SUBMIT ---------------- */}
        <button
          disabled={isAdding}
          className="w-full sm:w-48 h-12 cursor-pointer bg-blue-600 hover:bg-blue-700
                     text-white rounded-xl font-medium transition"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
