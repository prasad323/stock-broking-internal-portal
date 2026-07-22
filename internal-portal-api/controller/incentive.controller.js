const Trade = require("../models/trade.model");

// Manager - View all incentives
const getIncentives = async (req, res) => {
  try {
    const result = await Trade.aggregate([
      {
        $lookup: {
          from: "mappings",
          localField: "clientId",
          foreignField: "clientId",
          as: "mapping",
        },
      },
      { $unwind: "$mapping" },

      {
        $lookup: {
          from: "employees",
          localField: "mapping.employeeId",
          foreignField: "employeeId",
          as: "employee",
        },
      },
      { $unwind: "$employee" },

      {
        $group: {
          _id: "$employee.employeeId",
          employeeName: { $first: "$employee.name" },
          incentivePercentage: {
            $first: {
              $ifNull: ["$employee.incentivePercentage", 0],
            },
          },
          totalTrades: { $sum: 1 },
          totalBrokerage: { $sum: "$brokerage" },
          clients: { $addToSet: "$clientId" },
        },
      },

      {
        $project: {
          _id: 0,
          employeeId: "$_id",
          employeeName: 1,
          totalTrades: 1,
          totalBrokerage: 1,
          totalClients: { $size: "$clients" },
          incentivePercentage: 1,
          incentive: {
            $round: [
              {
                $multiply: [
                  "$totalBrokerage",
                  {
                    $divide: ["$incentivePercentage", 100],
                  },
                ],
              },
              2,
            ],
          },
        },
      },

      {
        $sort: {
          totalBrokerage: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyIncentive = async (req, res) => {
  try {
    const employeeId = req.user.employeeId;

    const result = await Trade.aggregate([
      {
        $lookup: {
          from: "mappings",
          localField: "clientId",
          foreignField: "clientId",
          as: "mapping",
        },
      },
      { $unwind: "$mapping" },

      {
        $match: {
          "mapping.employeeId": employeeId,
        },
      },

      {
        $lookup: {
          from: "employees",
          localField: "mapping.employeeId",
          foreignField: "employeeId",
          as: "employee",
        },
      },
      { $unwind: "$employee" },

      {
        $group: {
          _id: "$employee.employeeId",
          employeeName: { $first: "$employee.name" },
          incentivePercentage: {
            $first: {
              $ifNull: ["$employee.incentivePercentage", 0],
            },
          },
          totalTrades: { $sum: 1 },
          totalBrokerage: { $sum: "$brokerage" },
          clients: { $addToSet: "$clientId" },
        },
      },

      {
        $project: {
          _id: 0,
          employeeId: "$_id",
          employeeName: 1,
          totalTrades: 1,
          totalBrokerage: 1,
          totalClients: { $size: "$clients" },
          incentivePercentage: 1,
          incentive: {
            $round: [
              {
                $multiply: [
                  "$totalBrokerage",
                  {
                    $divide: ["$incentivePercentage", 100],
                  },
                ],
              },
              2,
            ],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result[0] || {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getIncentives,
  getMyIncentive,
};