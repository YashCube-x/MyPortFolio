import { getSettings, updateSettings } from "../models/Settings.js";
import { deleteCloudinaryAsset } from "../config/cloudinary.js";

export const getSiteSettings = async (req, res) => {
  try {
    const settings = await getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("Get Settings Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateSiteSettings = async (req, res) => {
  try {
    const existing = await getSettings();

    if (req.body.resumeUrl && existing.resumePublicId && req.body.resumeUrl !== existing.resumeUrl) {
      await deleteCloudinaryAsset(existing.resumePublicId);
    }

    const updated = await updateSettings(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
