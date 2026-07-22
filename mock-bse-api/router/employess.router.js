const express = require("express");

const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employees.controller");

router.post("/", createEmployee);

router.get("/", getEmployees);

router.get("/:employeeId", getEmployeeById);

router.put("/:employeeId", updateEmployee);

router.delete("/:employeeId", deleteEmployee);

module.exports = router;