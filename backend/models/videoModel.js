import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    link:{
        type:String,
        required:true,
    },
    category: {
        type: String,
        required: true,
    }, 
},{timestamps: true});

const videoModel = mongoose.models.video || mongoose.model("video", videoSchema);

export default videoModel;