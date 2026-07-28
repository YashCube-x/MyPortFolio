import Service from "../models/Service.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    console.error("Get Service Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
