const express = require("express");

const router = express.Router();

const {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
} = require("../controller/trade.controller");

router.post("/", createTrade);

router.get("/", getTrades);

router.get("/:tradeId", getTradeById);

router.put("/:tradeId", updateTrade);

router.delete("/:tradeId", deleteTrade);

module.exports = router;