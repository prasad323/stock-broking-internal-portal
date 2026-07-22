const express = require("express");

const router = express.Router();

const {
  getTrades,
  getTradeById,
} = require("../controller/trade.controller");
const auth = require("../middleware/auth.middleware");


router.get("/", auth("manager"), getTrades);
router.get("/:tradeId", getTradeById);

module.exports = router;