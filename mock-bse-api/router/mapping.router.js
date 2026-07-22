const express = require("express");

const router = express.Router();

const {
  createMapping,
  getMappings,
  getMyClients,
  deleteMapping,
} = require("../controller/mapping.controller");

router.post("/", createMapping);

router.get("/", getMappings);

router.get("/employee/:employeeId", getMyClients);

router.delete("/:id", deleteMapping);

module.exports = router;