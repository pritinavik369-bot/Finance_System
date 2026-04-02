import errorHandler from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (
      !username ||
      !password ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      return next(errorHandler(400, "Username and password are required"));
    }

    const validUser = await User.findOne({ username }).populate("role_id");

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const isPasswordValid = await bcrypt.compare(password, validUser.password);

    if (!isPasswordValid) {
      return next(errorHandler(400, "Invalid password"));
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: validUser._id, role: validUser.role_id.role_name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({ token });
  } catch (error) {
    errorHandler(res, error);
  }
  res.json({ message: "Login route is working" });
};

/*export const signup = async (req, res) => {
  console.log(req.body); // Log the request body to see the incoming data
  res.json({ message: "Register route is working" });
}; */
