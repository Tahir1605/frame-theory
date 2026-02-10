import express from 'express';
import { addVideo,videoList,videoDelete } from '../controllers/videoController.js';


const videoRouter = express.Router();

videoRouter.post('/video-add',addVideo);
videoRouter.get('/video-list',videoList);
videoRouter.delete('/video-delete',videoDelete);

export default videoRouter;