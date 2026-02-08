import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
   
},{timestamps: true});

const imageModel = mongoose.models.image || mongoose.model("image", imageSchema);

export default imageModel;