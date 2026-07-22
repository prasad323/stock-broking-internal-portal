const Client = require("../models/client.model");
const Mapping = require("../models/mapping.model");
const getClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const total = await Client.countDocuments(filter);

    const clients = await Client.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: clients,
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
    const employeeId = req.user.employeeId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    // Get mapped client IDs
    const mappings = await Mapping.find({ employeeId });

    const clientIds = mappings.map((m) => m.clientId);

    const filter = {
      clientId: { $in: clientIds },
    };

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const total = await Client.countDocuments(filter);

    const clients = await Client.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: clients,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  getClients,
  getMyClients
};