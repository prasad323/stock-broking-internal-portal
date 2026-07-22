const mongoose = require("mongoose");
const syncData = require("./services/sync.sevices");

require("./db");

(async () => {
  await syncData();

  console.log("Done");

  mongoose.connection.close();
})();