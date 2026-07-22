const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    tradeId: {
      type: String,
      required: true,
      unique: true,
    },
    clientId: {
      type: String,
      required: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brokerage: {
      type: Number,
      required: true,
    },
    tradeDate: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trades", tradeSchema);