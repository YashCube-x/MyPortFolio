import express from "express";
import upload from "../middleware/upload.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", requireAdmin, upload.single("file"), uploadFile);

export default router;
