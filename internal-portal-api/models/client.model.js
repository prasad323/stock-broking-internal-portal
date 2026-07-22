const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    pan: {
      type: String,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clients", clientSchema);