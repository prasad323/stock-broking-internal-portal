const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      index: true,
    },

    clientId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

mappingSchema.index(
  { employeeId: 1, clientId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Mapping", mappingSchema);