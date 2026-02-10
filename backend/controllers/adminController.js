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


    if (name.length < 3) {
      return res.json({
        success: false,
        message: "Name must be at least 3 characters long",
      });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Invalid email format",
      });
    }

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
      fileId: uploadResult.fileId,
    }

    const admin = new adminModel(adminData)
    await admin.save();

    // Remove local file safely
    fs.unlink(imageFile.path, () => { });

    res.json({
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

const adminList = async (req, res) => {
  try {
    const admins = await adminModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: admins,
    });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to fetch admin list",
    });
  }
};


const updateAdmin = async (req, res) => {
  try {
    const { adminId, name, email, password } = req.body;
    const imageFile = req.file;

    if (!adminId) {
      return res.json({
        success: false,
        message: "Admin ID is required",
      });
    }

    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    /* ================= UPDATE FIELDS ================= */

    if (name) {
      if (name.length < 3) {
        return res.json({
          success: false,
          message: "Name must be at least 3 characters long",
        });
      }
      admin.name = name;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.json({
          success: false,
          message: "Invalid email format",
        });
      }
      admin.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return res.json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    /* ================= IMAGE UPDATE ================= */

    if (imageFile) {
      // delete old image from imagekit
      if (admin.fileId) {
        await imagekit.deleteFile(admin.fileId);
      }

      const fileBuffer = fs.readFileSync(imageFile.path);

      const uploadResult = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/admins",
      });

      admin.image = imagekit.url({
        path: uploadResult.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      admin.fileId = uploadResult.fileId;

      fs.unlink(imageFile.path, () => { });
    }

    await admin.save();

    res.json({
      success: true,
      message: "Admin updated successfully",
    });

  } catch (error) {
    console.error(error);
    // console.log("UPDATE ADMIN HIT");
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};


const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({
        success: false,
        message: "Admin ID is required",
      });
    }

    const admin = await adminModel.findById(id);
    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    // delete image from imagekit
    if (admin.fileId) {
      await imagekit.deleteFile(admin.fileId);
    }

    await adminModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Admin deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};


export { addAdmin, updateAdmin, deleteAdmin, adminList };