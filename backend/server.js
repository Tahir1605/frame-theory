import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRoute.js';
import imageRouter from './routes/imageRoute.js';
import editImageRouter from './routes/editImageRoute.js';
import videoRouter from './routes/videoRoute.js';
import reviewRouter from './routes/reviewRoute.js';

// App configuration
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/admin',imageRouter);
app.use('/api/admin',editImageRouter);
app.use('/api/admin',videoRouter);
app.use('/api/admin',reviewRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});