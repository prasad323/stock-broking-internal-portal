const Trade = require("../models/trade.model");

const getTrades = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const filter = {};

    if (search) {
      filter.clientId = {
        $regex: search,
        $options: "i",
      };
    }

    const total = await Trade.countDocuments(filter);

    const trades = await Trade.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: trades,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findOne({
      tradeId: req.params.tradeId,
    });

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    res.status(200).json({
      success: true,
      data: trade,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTrades,
  getTradeById,
};