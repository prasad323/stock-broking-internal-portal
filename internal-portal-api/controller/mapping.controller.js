const Mapping = require("../models/mapping.model");

// Create Mapping
const createMapping = async (req, res) => {
  try {
    const mapping = await Mapping.create(req.body);

    res.status(201).json({
      success: true,
      message: "Mapping created successfully",
      data: mapping,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMappings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const pipeline = [];

    if (search) {
      pipeline.push({
        $match: {
          clientId: {
            $regex: search,
            $options: "i",
          },
        },
      });
    }

    pipeline.push(
      {
        $lookup: {
          from: "clients",
          localField: "clientId",
          foreignField: "clientId",
          as: "client",
        },
      },
      {
        $unwind: "$client",
      },
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employee",
        },
      },
      {
        $unwind: "$employee",
      },
      {
        $project: {
          _id: 1,
          clientId: 1,
          employeeId: 1,
          clientName: "$client.name",
          employeeName: "$employee.name",
        },
      },
      {
        $sort: {
          clientId: 1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      }
    );

    const mappings = await Mapping.aggregate(pipeline);

    const total = await Mapping.countDocuments(
      search
        ? {
            clientId: {
              $regex: search,
              $options: "i",
            },
          }
        : {}
    );

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// const getMappings = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const search = req.query.search || "";

//     const pipeline = [];

//     if (search) {
//       pipeline.push({
//         $match: {
//           clientId: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//       });
//     }

//     pipeline.push(
//       {
//         $lookup: {
//           from: "clients",
//           localField: "clientId",
//           foreignField: "clientId",
//           as: "client",
//         },
//       },
//       {
//         $unwind: "$client",
//       },
//       {
//         $lookup: {
//           from: "employees",
//           localField: "employeeId",
//           foreignField: "employeeId",
//           as: "employee",
//         },
//       },
//       {
//         $unwind: "$employee",
//       }
//     );

//     const totalResult = await Mapping.aggregate([
//       ...pipeline,
//       { $count: "total" },
//     ]);

//     const total =
//       totalResult.length > 0 ? totalResult[0].total : 0;

//     const mappings = await Mapping.aggregate([
//       ...pipeline,
//       {
//         $project: {
//           _id: 1,
//           clientId: 1,
//           clientName: "$client.name",
//           employeeId: 1,
//           employeeName: "$employee.name",
//         },
//       },
//       {
//         $skip: (page - 1) * limit,
//       },
//       {
//         $limit: limit,
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       total,
//       page,
//       totalPages: Math.ceil(total / limit),
//       data: mappings,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

const getEmployeeMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find({
      employeeId: req.params.employeeId,
    });

    res.status(200).json({
      success: true,
      count: mappings.length,
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Mapping
const updateMapping = async (req, res) => {
  try {
    const mapping = await Mapping.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!mapping) {
      return res.status(404).json({
        success: false,
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mapping updated successfully",
      data: mapping,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Mapping
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMapping,
  getMappings,
  getEmployeeMappings,
  updateMapping,
  deleteMapping,
};