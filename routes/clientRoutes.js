const express = require("express");
const Client = require("../models/Clients.model");

const router = express.Router();

// Create a new client
router.post("/", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific client by ID
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a client by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) return res.status(404).json({ error: "Client not found" });
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a client by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ error: "Client not found" });
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
