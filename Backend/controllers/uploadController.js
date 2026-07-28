import { Readable } from "stream";
import cloudinary, { isCloudinaryConfigured } from "../config/cloudinary.js";

export const uploadFile = (req, res) => {
  if (!isCloudinaryConfigured()) {
    return res.status(500).json({
      success: false,
      message: "Image upload is not configured on the server. Set the CLOUDINARY_* env vars.",
    });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file provided" });
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: "portfolio", resource_type: "auto" },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ success: false, message: "Upload failed" });
      }
      res.json({ success: true, url: result.secure_url, publicId: result.public_id });
    }
  );

  Readable.from(req.file.buffer).pipe(stream);
};
