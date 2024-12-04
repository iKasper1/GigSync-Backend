const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String },
  address: { type: String },
  notes: { type: String },
});

// Explicitly set the collection name to 'Clients'
module.exports = mongoose.model("Client", clientSchema, "Clients");
