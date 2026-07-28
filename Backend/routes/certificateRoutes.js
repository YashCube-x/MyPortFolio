import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";
import {
  getAllCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();

router.get("/", getAllCertificates);
router.get("/:id", getCertificate);
router.post("/", requireAdmin, createCertificate);
router.put("/:id", requireAdmin, updateCertificate);
router.delete("/:id", requireAdmin, deleteCertificate);

export default router;
