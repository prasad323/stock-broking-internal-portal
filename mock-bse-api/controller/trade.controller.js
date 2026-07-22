const Trade = require("../model/trade.model");

const createTrade = async (req, res) => {
  try {
    const trade = await Trade.create(req.body);

    res.status(201).json({
      success: true,
      message: "Trade created successfully",
      data: trade,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTrades = async (req, res) => {
  try {
    const { clientId, from, to } = req.query;

    let filter = {};

    if (clientId) {
      filter.clientId = clientId;
    }

    if (from || to) {
      filter.tradeDate = {};

      if (from) {
        filter.tradeDate.$gte = new Date(from);
      }

      if (to) {
        filter.tradeDate.$lte = new Date(to);
      }
    }

    const trades = await Trade.find(filter).sort({
      tradeDate: -1,
    });

    res.status(200).json({
      success: true,
      count: trades.length,
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateTrade = async (req, res) => {
  try {
    const trade = await Trade.findOneAndUpdate(
      { tradeId: req.params.tradeId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trade updated successfully",
      data: trade,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findOneAndDelete({
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
      message: "Trade deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
};