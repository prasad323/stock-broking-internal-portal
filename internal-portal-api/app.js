const express = require("express");
const cors = require("cors");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/trades", require("./routes/trade.routes"));
app.use("/api/employees", require("./routes/employee.routes"));
app.use("/api/mappings", require("./routes/mapping.routes"));
app.use("/api/incentives", require("./routes/incentive.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

module.exports = app;