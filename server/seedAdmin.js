import connectDB from "./config.db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    connectDB();

    // check if admin exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // create admin
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "Admin",
    });

    console.log(" Admin created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();