const jwt = require("jsonwebtoken");

module.exports = (...roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      console.log("Authorization Header:", authHeader);

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "No Token",
        });
      }

      const token = authHeader.split(" ")[1];

      console.log("Token:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "mySuperSecretKey123"
      );

      console.log("Decoded User:", decoded);

      req.user = decoded;

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Access Denied",
        });
      }

      next();
    } catch (err) {
      console.error("JWT Error:", err.message);

      return res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };
};