const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  getIncentives,
  getMyIncentive,
} = require("../controller/incentive.controller");

// Manager can see all incentives
router.get("/", auth("manager"), getIncentives);

// Employee can see only their own incentive
router.get("/my", auth("employee"), getMyIncentive);

module.exports = router;