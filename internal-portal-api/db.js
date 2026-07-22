const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/internal_portal")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;