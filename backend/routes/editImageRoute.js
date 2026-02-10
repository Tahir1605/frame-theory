import express from "express";
import upload from "../middleware/multer.js";
import {
  addEditImage,
  editImageList,
  editImageDelete,
} from "../controllers/editImageController.js";

const editImageRouter = express.Router();

editImageRouter.post(
  "/add-edit-image",
  upload.fields([
    { name: "beforeImage"},
    { name: "afterImage" },
  ]),
  addEditImage
);

editImageRouter.get("/edit-image-list", editImageList);
editImageRouter.delete("/edit-image-delete", editImageDelete);

export default editImageRouter;
