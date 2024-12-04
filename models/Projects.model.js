const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  budget: { type: Number, required: true },
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
});

// Explicitly set the collection name to 'Projects'
module.exports = mongoose.model("Project", projectSchema, "Projects");
