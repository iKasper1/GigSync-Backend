const express = require("express");
const Project = require("../models/Projects.model");

const router = express.Router();

// Create a new project
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("client", "name email");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("client", "name email");
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a project by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
