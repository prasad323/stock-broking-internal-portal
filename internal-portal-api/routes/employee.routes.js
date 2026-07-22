const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employee.controller");

router.post("/", createEmployee);

router.get("/", auth("manager"), getEmployees);

router.get("/:employeeId", getEmployeeById);

router.put("/:employeeId", updateEmployee);

router.delete("/:employeeId", deleteEmployee);

module.exports = router;