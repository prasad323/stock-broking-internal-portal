const Mapping = require("../model/mapping.model");
const Client = require("../model/client.model");

const createMapping = async (req, res) => {
  try {
    const mapping = await Mapping.create(req.body);

    res.status(201).json({
      success: true,
      message: "Mapping created successfully",
      data: mapping,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find();

    res.status(200).json({
      success: true,
      count: mappings.length,
      data: mappings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyClients = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const mappings = await Mapping.find({ employeeId });

    const clientIds = mappings.map((m) => m.clientId);

    const clients = await Client.find({
      clientId: { $in: clientIds },
    });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteMapping = async (req, res) => {
  try {
    const mapping = await Mapping.findByIdAndDelete(req.params.id);

    if (!mapping) {
      return res.status(404).json({
        success: false,
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mapping deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createMapping,
  getMappings,
  getMyClients,
  deleteMapping,
};