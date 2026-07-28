import Project from "../models/Project.js";
import { deleteCloudinaryAsset } from "../config/cloudinary.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    console.error("Get Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (req.body.image && existing.imagePublicId && req.body.image !== existing.image) {
      await deleteCloudinaryAsset(existing.imagePublicId);
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    await deleteCloudinaryAsset(project.imagePublicId);
    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
