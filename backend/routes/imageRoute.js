import express from 'express';
import { imageAdd, imageDelete, imageList } from '../controllers/imageController.js';
import upload from '../middleware/multer.js';


const imageRouter = express.Router();

imageRouter.post('/image-add',upload.single("image"),imageAdd);
imageRouter.get('/image-list',imageList);
imageRouter.delete('/image-delete',imageDelete);

export default imageRouter;