import express from "express";
import { createContact, getAllContacts, markContactRead, deleteContact } from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/contact
router.post("/contact", createContact);
router.get("/contact", requireAdmin, getAllContacts);
router.patch("/contact/:id/read", requireAdmin, markContactRead);
router.delete("/contact/:id", requireAdmin, deleteContact);

export default router;
