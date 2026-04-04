import express from "express";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import recordRoutes from "./routes/record.route.js";


import connectDB from "./config.db.js";
import { apiLimiter } from "./middleware/rateLimiter.js"; 


connectDB();

const app = express();




app.use(express.json());


app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// rate limit
app.use('/api', apiLimiter);


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/financial', recordRoutes);

// middleware for wrroe
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    msg
  });
});

// just for testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});