const express = require("express");

const router = express.Router();

const { getClients,getMyClients } = require("../controller/client.controller");
const auth = require("../middleware/auth.middleware");




router.get(
  "/my-clients",
  auth("employee"),
  getMyClients
);
router.get("/", auth("manager"), getClients);
module.exports = router;