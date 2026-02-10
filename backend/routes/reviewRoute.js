import express from 'express';
import { reviewAdd,reviewList,reviewDelete } from '../controllers/reviewController.js';
import upload from '../middleware/multer.js';


const reviewRouter = express.Router();

reviewRouter.post('/review-add',upload.single("image"),reviewAdd);
reviewRouter.get('/review-list',reviewList);
reviewRouter.delete('/review-delete',reviewDelete);

export default reviewRouter;