import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProject);
router.post("/", requireAdmin, createProject);
router.put("/:id", requireAdmin, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

export default router;
