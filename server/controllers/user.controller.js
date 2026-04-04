// controllers/user.controller.js
import User from "../models/user.model.js";
import { errorHandler } from "../middleware/error.js";
import bcrypt from "bcryptjs";

import Contact from "../models/contact.model.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
 console.log("EMAIL_USER:", process.env.EMAIL_USER);

//mailsending
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter error:", error);
  } else {
    console.log("Mailer is ready to send messages!");
  }
});


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



export const ContactMe = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    console.log("Coming from contact.jsx:", name, email, message);

    const userId = req.user?.userId || null; // Optional for public contact form

    // Save message in database
    const newMessage = new Contact({ userId, name, email, message });
    await newMessage.save();

    // **1️⃣ Send email to Admin**
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email (Admin)
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // **2️⃣ Send Thank-You Email to User**
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // User's email
      subject: "Thank You for Contacting Me!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Hey there! 😊 I truly appreciate you reaching out. Your message has been received, and I'll get back to you shortly. Looking forward to connecting!</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Priti Navik</strong></p>
      `,
    });

    // Success Response
    res.status(201).json({ success: true, message: "Message sent successfully!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
