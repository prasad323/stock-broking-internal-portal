const cron = require("node-cron");

const syncData = require("../services/sync.sevices");

module.exports = (io) => {

    console.log("Sync Job Started");

    syncData(io);

    cron.schedule("* * * * *", async () => {

        console.log("Running Scheduled Sync...");

        await syncData(io);

    });

};




