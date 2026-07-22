const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      employeeId: user.employeeId,
    },
    process.env.JWT_SECRET || "mySuperSecretKey123",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

module.exports = generateToken;