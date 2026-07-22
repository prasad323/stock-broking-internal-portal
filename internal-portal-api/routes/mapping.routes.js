const express = require("express");

const router = express.Router();

const {
  createMapping,
  getMappings,
  getEmployeeMappings,
  updateMapping,
  deleteMapping,
} = require("../controller/mapping.controller");
const auth = require("../middleware/auth.middleware");


router.post("/", createMapping);

router.get("/", auth("manager"), getMappings);
router.get("/:employeeId", getEmployeeMappings);

router.put("/:id", updateMapping);

router.delete("/:id", deleteMapping);

module.exports = router;