import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    path: {
      type: String,
      default: "/",
    },
    referrer: {
      type: String,
      default: "direct",
    },
    device: {
      type: String,
      enum: ["desktop", "mobile"],
      default: "desktop",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;
