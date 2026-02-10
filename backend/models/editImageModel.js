import mongoose from "mongoose";

const editImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
    },
    beforeImage:{
        type: String,
        required: true,
    },
    afterImage:{
        type: String,
        required: true,
    },
    beforeFileId: {
      type: String,
      required: true,
    },
    afterFileId:{
        type:String,
        required:true,
    },
   
},{timestamps: true});

const editImageModel = mongoose.models.editImage || mongoose.model("editImage", editImageSchema);

export default editImageModel;