import { v2 as cloudinary } from "cloudinary";

export const isCloudinaryConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn("⚠️  Cloudinary env vars missing — file uploads will fail until configured.");
}

export const deleteCloudinaryAsset = async (publicId) => {
  if (!publicId || !isCloudinaryConfigured()) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
};

export default cloudinary;
