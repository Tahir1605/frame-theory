import express from 'express';
import {addAdmin,adminList,updateAdmin,deleteAdmin} from '../controllers/adminController.js'
import upload from '../middleware/multer.js';

const adminRouter = express.Router();
adminRouter.post('/add-admin',addAdmin);
adminRouter.get('/admin-list',adminList);
adminRouter.post('/update-admin',updateAdmin);
adminRouter.post('/delete-admin',deleteAdmin);

export default adminRouter