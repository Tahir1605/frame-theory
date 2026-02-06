import fs from 'fs';
import bcrypt from "bcryptjs";
import imagekit from '../config/imagekit.js';
import adminModel from '../models/adminModel.js';

const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    /* ================= VALIDATIONS ================= */

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Admin image is required",
      });
    }

    // Name validation
    if (name.length < 3) {
      return res.json({
        success: false,
        message: "Name must be at least 3 characters long",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    /* ================= CHECK EXISTING ADMIN ================= */

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.json({
        success: false,
        message: "Admin already exists",
      });
    }

    /* ================= HASH PASSWORD ================= */

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* ================= IMAGE UPLOAD ================= */

    const fileBuffer = fs.readFileSync(imageFile.path);

    const uploadResult = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/admins",
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

    const adminData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
    }

    const admin = new adminModel(adminData)
    await admin.save();

    // Remove local file safely
    fs.unlink(imageFile.path, () => {});

    return res.json({
      success: true,
      message: "Admin added successfully",

    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

const adminList = async (req , res) => {
    try {
        
    } catch (error) {
        
    }
}

const updateAdmin = async (req , res) => {
    try {
        
    } catch (error) {
        
    }
}

const deleteAdmin = async (req , res) => {
    try {
        
    } catch (error) {
        
    }
}

export {addAdmin, updateAdmin, deleteAdmin, adminList};