import express from "express";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();

// POST /api/contact
router.post("/contact", createContact);

export default router;
