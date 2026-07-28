import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    client: {
      type: String,
      trim: true,
      default: "Personal Project",
    },
    duration: {
      type: String,
      trim: true,
    },
    task: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      trim: true,
      default: "#",
    },
    demo: {
      type: String,
      trim: true,
      default: "#",
    },
    image: {
      type: String,
      default: "",
    },
    imagePublicId: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
