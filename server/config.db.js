import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO);
  console.log("DB connected");
};

export default connectDB;