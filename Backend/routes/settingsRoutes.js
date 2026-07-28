import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { getSiteSettings, updateSiteSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getSiteSettings);
router.put("/", requireAdmin, updateSiteSettings);

export default router;
