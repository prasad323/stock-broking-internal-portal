const express = require("express");
console.log("Dashboard Route Loaded");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  getDashboard,getEmployeeDashboard
} = require("../controller/dashboard.controller");

router.get("/", auth("manager"), getDashboard);
router.get(
  "/employee",
  auth("employee"),
  getEmployeeDashboard
);

module.exports = router;