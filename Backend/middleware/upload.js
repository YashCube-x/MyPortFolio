import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = file.mimetype.startsWith("image/") || file.mimetype === "application/pdf";
    if (!allowed) {
      return cb(new Error("Only image files or PDFs are allowed"));
    }
    cb(null, true);
  },
});

export default upload;
