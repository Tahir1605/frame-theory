import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    review: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String, // image URL or path
      required:true
    },
    status: {
      type: Boolean,
      default: true, // for admin approval system
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
