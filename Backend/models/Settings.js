import mongoose from "mongoose";

const SETTINGS_ID = "000000000000000000000001";

const settingsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: SETTINGS_ID,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    social: {
      github: { type: String, trim: true, default: "" },
      instagram: { type: String, trim: true, default: "" },
      facebook: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
    },
    resumeUrl: {
      type: String,
      default: "",
    },
    resumePublicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

export const getSettings = async () => {
  return Settings.findOneAndUpdate(
    { _id: SETTINGS_ID },
    { $setOnInsert: { _id: SETTINGS_ID } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

export const updateSettings = async (patch) => {
  return Settings.findOneAndUpdate(
    { _id: SETTINGS_ID },
    { $set: patch },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
};

export default Settings;
