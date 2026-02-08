import express from 'express';
import {addAdmin,adminList,updateAdmin,deleteAdmin} from '../controllers/adminController.js'
import upload from '../middleware/multer.js';

const adminRouter = express.Router();
adminRouter.post('/add-admin', upload.single("image"),addAdmin);
adminRouter.get('/admin-list',adminList);
adminRouter.post('/update-admin',upload.single("image"),updateAdmin);
adminRouter.delete('/delete-admin',deleteAdmin);

export default adminRouter