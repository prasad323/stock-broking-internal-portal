const clientRouter = require("./router/client.router");
const tradeRouter = require("./router/trade.router");
const employeeRouter = require("./router/employess.router");
const mappingRouter = require("./router/mapping.router");


module.exports = (app) => {
  app.use("/api/clients", clientRouter);

  app.use("/api/trades", tradeRouter);

  app.use("/api/employees", employeeRouter);

  app.use("/api/mappings", mappingRouter);

};