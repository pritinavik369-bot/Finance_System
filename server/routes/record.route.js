import express from "express";
import { createRecord, getRecords, updateRecord, deleteRecord, getSummary } from "../controllers/record.controller.js";
import verifyUser from "../middleware/verifyUser.js";

import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// Get summary for authenticated user (admin/analyst only)
router.get("/summary", verifyUser, verifyRole(["admin", "analyst"]), getSummary);

// Get all records for authenticated user (admin/analyst)
router.get("/records", verifyUser, verifyRole(["admin", "analyst"]), getRecords);

// Create a new record - admin/analyst
router.post("/records", verifyUser, verifyRole(["admin"]), createRecord);

// Update a record - only admin
router.put("/records/:id", verifyUser, verifyRole(["admin"]), updateRecord);

// Delete a record - only admin
router.delete("/records/:id", verifyUser, verifyRole(["admin"]), deleteRecord);

export default router;