import Certificate from "../models/Certificate.js";
import { deleteCloudinaryAsset } from "../config/cloudinary.js";

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: certificates });
  } catch (error) {
    console.error("Get Certificates Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    res.json({ success: true, data: certificate });
  } catch (error) {
    console.error("Get Certificate Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    console.error("Create Certificate Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const existing = await Certificate.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    if (req.body.image && existing.imagePublicId && req.body.image !== existing.image) {
      await deleteCloudinaryAsset(existing.imagePublicId);
    }

    const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Certificate Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    await deleteCloudinaryAsset(certificate.imagePublicId);
    res.json({ success: true, message: "Certificate deleted" });
  } catch (error) {
    console.error("Delete Certificate Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
