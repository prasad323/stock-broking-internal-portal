const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  getIncentives,
  getMyIncentive,
} = require("../controller/incentive.controller");

router.get("/", auth("manager"), getIncentives);

router.get("/my", auth("employee"), getMyIncentive);

module.exports = router;