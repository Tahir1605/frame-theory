import fs from 'fs';
import imagekit from '../config/imagekit.js';
import imageModel from '../models/imageModel.js';

const imageAdd = async (req,res) => {
   try {
       const { name, category } = req.body;
       const imageFile = req.file;
   
       /* ================= VALIDATIONS ================= */
   
       if (!name || !category) {
        return res.json({
           success: false,
           message: "Name and category is required",
         });
       }
   
       if (!imageFile) {
        return res.json({
           success: false,
           message: "Image is required",
         });
       }
   
       // Name validation
       if (name.length < 3) {
      return res.json({
           success: false,
           message: "Name must be at least 3 characters long",
         });
       }
   
       /* ================= IMAGE UPLOAD ================= */
   
       const fileBuffer = fs.readFileSync(imageFile.path);
   
       const uploadResult = await imagekit.upload({
         file: fileBuffer,
         fileName: imageFile.originalname,
         folder: "/images",
       });
   
       const imageUrl = imagekit.url({
         path: uploadResult.filePath,
         transformation: [
           { quality: "auto" },
           { format: "webp" },
           { width: "1280" },
         ],
       });
   
       /* ================= SAVE ADMIN ================= */
   
       const imageData = {
         name,
         category,
         image: imageUrl,
         fileId: uploadResult.fileId,
       }
   
       const image = new imageModel(imageData)
       await image.save();
   
       // Remove local file safely
       fs.unlink(imageFile.path, () => {});
   
       res.json({
         success: true,
         message: "Image added successfully",
   
       });
   
     } catch (error) {
       console.error(error);
      res.json({
         success: false,
         message: "Internal server error",
       });
     }
}

const imageList = async (req, res) => {
  try {
    const images = await imageModel.find().sort({ createdAt: -1 }); //it fetches recent most
    // const images = await imageModel.find({});

    res.json({success: true, data:images,});

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to fetch images",
    });
  }
};


const imageDelete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
    return res.json({
        success: false,
        message: "Image ID is required",
      });
    }

    const imageData = await imageModel.findById(id);

    if (!imageData) {
    return  res.json({
        success: false,
        message: "Image not found",
      });
    }

    await imagekit.deleteFile(imageData.fileId);

    await imageModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to delete image",
    });
  }
};


export {imageAdd,imageList,imageDelete};