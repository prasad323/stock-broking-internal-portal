const Client = require("../models/client.model");
const Trade = require("../models/trade.model");
const Employee = require("../models/employee.model");
const Mapping = require("../models/mapping.model");


const getEmployeeDashboard = async (req, res) => {
    console.log(req.user);
  try {
    const employeeId = req.user.employeeId;

    // Clients assigned to employee
    const mappings = await Mapping.find({ employeeId });

    const clientIds = mappings.map((m) => m.clientId);

    // Trades of assigned clients
    const trades = await Trade.find({
      clientId: { $in: clientIds },
    });

    const totalBrokerage = trades.reduce(
      (sum, trade) => sum + trade.brokerage,
      0
    );

    const employee = await Employee.findOne({ employeeId });

    const incentivePercentage =
      employee?.incentivePercentage || 0;

    const incentive =
      (totalBrokerage * incentivePercentage) / 100;

    res.json({
      success: true,
      data: {
        totalClients: clientIds.length,
        totalTrades: trades.length,
        totalBrokerage,
        incentive,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getDashboard = async (req, res) => {
  try {
    const [
      totalClients,
      totalTrades,
      totalEmployees,
      totalMappings,
    ] = await Promise.all([
      Client.countDocuments(),
      Trade.countDocuments(),
      Employee.countDocuments(),
      Mapping.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        totalClients,
        totalTrades,
        totalEmployees,
        totalMappings,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboard,
  getEmployeeDashboard
};