import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";
import {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getService);
router.post("/", requireAdmin, createService);
router.put("/:id", requireAdmin, updateService);
router.delete("/:id", requireAdmin, deleteService);

export default router;
