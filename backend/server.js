import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRoute.js';

// App configuration
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Api endpoints
app.use('/api/admin', adminRouter);


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});