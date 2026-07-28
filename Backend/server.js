import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();

// CORS (local + production) - Must be before other middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://your-frontend-url.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200  // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly for all routes
app.options(/.*/, cors(corsOptions));

// Body parser
app.use(express.json());

// Routes
app.use("/api", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
