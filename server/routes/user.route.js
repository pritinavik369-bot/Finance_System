// routes/user.routes.js
import express from "express";
import { createUser, getUsers, deleteUser, updateUser } from "../controllers/user.controller.js";
import verifyUser from "../middleware/verifyUser.js";

import verifyRole from "../middleware/verifyRole.js";


const router = express.Router();

// Create a new user - only admin can create users
router.post("/create", verifyUser, verifyRole(["admin"]), createUser);

// Get all users - admin + analyst can view users
router.get("/getusers", verifyUser, verifyRole(["admin", "analyst"]), getUsers);

// Delete a user by ID - only admin
router.delete("/deleteuser/:userId", verifyUser, verifyRole(["admin"]), deleteUser);

// Update a user by ID - only admin
router.put("/updateuser/:userId", verifyUser, verifyRole(["admin"]), updateUser);

export default router;