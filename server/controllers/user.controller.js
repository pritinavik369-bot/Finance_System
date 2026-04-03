// controllers/user.controller.js
import User from "../models/user.model.js";
import { errorHandler } from "../middleware/error.js";
import bcrypt from "bcryptjs";

// Create a new user - only admin
export const createUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(errorHandler(403, "You are not allowed to create a user"));
    }

    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password || !role) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const normalizedRole = role.toLowerCase();
    if (!["admin", "analyst", "viewer"].includes(normalizedRole)) {
      return next(errorHandler(400, "Invalid role"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
      status: status || "active",
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      status: savedUser.status,
    });
  } catch (error) {
    next(error);
  }
};

// Get users - admin and analyst can view
export const getUsers = async (req, res, next) => {
  try {
    if (!["admin", "analyst"].includes(req.user.role)) {
      return next(errorHandler(403, "You are not allowed to view users"));
    }

    const users = await User.find().select("-password"); // hide passwords
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Delete user - only admin
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(errorHandler(403, "You are not allowed to delete users"));
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

// Update user - only admin
export const updateUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(errorHandler(403, "You are not allowed to update users"));
    }

    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, updates, {
      new: true,
    }).select("-password");

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};