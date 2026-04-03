import express from "express";
import { createRecord } from "../controllers/record.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// Only Admin can create records
router.post("/", verifyUser, verifyRole(["admin"]), createRecord);

export default router;