const axios = require("axios");

const retry = require("../utils/retry");

const Client = require("../models/client.model");
const Trade = require("../models/trade.model");
const Employee = require("../models/employee.model");
const Mapping = require("../models/mapping.model");

const syncData = async (io) => {
  try {

    const clientsResponse = await retry(() =>
       axios.get("https://mock-bse-apii.onrender.com/api/clients")
    );

    const clients = clientsResponse.data.data;

    console.log(`Fetched ${clients.length} clients`);

    for (const client of clients) {
      await Client.updateOne(
        { clientId: client.clientId },
        { $set: client },
        { upsert: true }
      );
    }

    console.log("Clients Synced");

    const tradesResponse = await retry(() =>
     axios.get("https://mock-bse-apii.onrender.com/api/trades")
    );

    const trades = tradesResponse.data.data;

    console.log(`Fetched ${trades.length} trades`);

    for (const trade of trades) {
      await Trade.updateOne(
        { tradeId: trade.tradeId },
        { $set: trade },
        { upsert: true }
      );
    }

    console.log("Trades Synced");

    const employeesResponse = await retry(() =>
      axios.get("https://mock-bse-apii.onrender.com/api/employees")
    );

    const employees = employeesResponse.data.data;

    console.log(`Fetched ${employees.length} employees`);

    for (const employee of employees) {
      await Employee.updateOne(
        { employeeId: employee.employeeId },
        { $set: employee },
        { upsert: true }
      );
    }

    console.log("Employees Synced");

    const mappingsResponse = await retry(() =>
      axios.get("https://mock-bse-apii.onrender.com/api/mappings")
    );

    const mappings = mappingsResponse.data.data;

    console.log(`Fetched ${mappings.length} mappings`);

    for (const mapping of mappings) {
      await Mapping.updateOne(
        {
          employeeId: mapping.employeeId,
          clientId: mapping.clientId,
        },
        { $set: mapping },
        { upsert: true }
      );
    }

    console.log("Mappings Synced");

    console.log("Sync Completed");

    

if (io) {

    io.emit("data-updated", {

        message: "Fresh Data Synced",

        time: new Date()

    });

}
  } catch (error) {
    console.error("Sync Failed:", error.message);
  }
};

module.exports = syncData;