import fs from 'fs';
import imagekit from '../config/imagekit.js';
import editImageModel from '../models/editImageModel.js';


const addEditImage = async (req, res) => {
    try {
        const { name, category } = req.body;

        const beforeFile = req.files?.beforeImage?.[0];
        const afterFile = req.files?.afterImage?.[0];

        /* ================= VALIDATION ================= */

        if (!name || !category) {
            return res.json({
                success: false,
                message: "Name and category are required",
            });
        }

        if (!beforeFile || !afterFile) {
            return res.json({
                success: false,
                message: "Both before and after images are required",
            });
        }

        if (name.length < 3) {
            return res.json({
                success: false,
                message: "Name must be at least 3 characters long",
            });
        }

        /* ================= UPLOAD BEFORE IMAGE ================= */

        const beforeBuffer = fs.readFileSync(beforeFile.path);

        const beforeUpload = await imagekit.upload({
            file: beforeBuffer,
            fileName: beforeFile.originalname,
            folder: "/edit-images/before",
        });

        const beforeImageUrl = imagekit.url({
            path: beforeUpload.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: "1280" },
            ],
        });

        /* ================= UPLOAD AFTER IMAGE ================= */

        const afterBuffer = fs.readFileSync(afterFile.path);

        const afterUpload = await imagekit.upload({
            file: afterBuffer,
            fileName: afterFile.originalname,
            folder: "/edit-images/after",
        });

        const afterImageUrl = imagekit.url({
            path: afterUpload.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: "1280" },
            ],
        });

        /* ================= SAVE TO DATABASE ================= */

        const editImage = new editImageModel({
            name,
            category,
            beforeImage: beforeImageUrl,
            afterImage: afterImageUrl,
            beforeFileId: beforeUpload.fileId,
            afterFileId: afterUpload.fileId,
        });

        await editImage.save();

        /* ================= CLEAN LOCAL FILES ================= */

        fs.unlink(beforeFile.path, () => { });
        fs.unlink(afterFile.path, () => { });

        return res.json({
            success: true,
            message: "Edit image added successfully",
        });

    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "Internal server error",
        });
    }
};

const editImageList = async (req, res) => {
  try {
    const editImageData = await editImageModel
      .find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: editImageData,
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to fetch images",
    });
  }
};


const editImageDelete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({
        success: false,
        message: "Image id is required",
      });
    }

    const image = await editImageModel.findById(id);

    if (!image) {
      return res.json({
        success: false,
        message: "Image not found",
      });
    }

    /* ================= DELETE FROM IMAGEKIT ================= */

    await imagekit.deleteFile(image.beforeFileId);
    await imagekit.deleteFile(image.afterFileId);

    /* ================= DELETE FROM DB ================= */

    await editImageModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Edit image deleted successfully",
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to delete image",
    });
  }
};


export { addEditImage, editImageList, editImageDelete };