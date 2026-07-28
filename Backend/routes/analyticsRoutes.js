import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { recordVisit, getAnalyticsSummary } from "../controllers/analyticsController.js";

const router = express.Router();

router.post("/visit", recordVisit);
router.get("/summary", requireAdmin, getAnalyticsSummary);

export default router;
