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
       }
   
       const image = new imageModel(imageData)
       await image.save();
   
       // Remove local file safely
       fs.unlink(imageFile.path, () => {});
   
       return res.json({
         success: true,
         message: "Image added successfully",
   
       });
   
     } catch (error) {
       console.error(error);
       return res.json({
         success: false,
         message: "Internal server error",
       });
     }
}

const imageList = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

const imageDelete = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

export {imageAdd,imageList,imageDelete};