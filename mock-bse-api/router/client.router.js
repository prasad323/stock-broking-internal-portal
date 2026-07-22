const express = require("express");

const router = express.Router();

const delay = require("../middleware/delay");
const randomFailure = require("../middleware/randomFailure");

const {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
} = require("../controller/client.controller");

router.get("/", delay, randomFailure, getClients);

router.get("/:clientId", delay, randomFailure, getClientById);

router.post("/", createClient);
router.put("/:clientId", updateClient);
router.delete("/:clientId", deleteClient);

module.exports = router;