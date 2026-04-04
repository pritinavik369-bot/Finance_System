import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import recordRoutes from "./routes/record.route.js";
import connectDB from "./config.db.js";
import cors from "cors";
import cookieParser from "cookie-parser";


connectDB(); // Connect to the database

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/user', userRoutes); // Use the user routes
app.use('/api/auth' , authRoutes);


app.use('/api/financial', recordRoutes);

app.use((err, req , res , next)=>{
const statusCode = err.statusCode||500;
const msg = err.message ||'internal server Error';
res.status(statusCode).json({

success: false,
statusCode,
msg
});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

