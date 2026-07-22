const cron = require("node-cron");

const syncData = require("../services/sync.sevices");

module.exports = (io) => {

    console.log("Sync Job Started");

    // Initial Sync
    syncData(io);

    // Every 1 minute
    cron.schedule("* * * * *", async () => {

        console.log("Running Scheduled Sync...");

        await syncData(io);

    });

};



// const cron = require("node-cron");
// const syncData = require("../services/sync.service");

// module.exports = (io) => {

//   console.log("Sync Job Started");

//   let isSyncRunning = false;

//   const runSync = async () => {

//     if (isSyncRunning) {
//       console.log("Previous sync is still running. Skipping...");
//       return;
//     }

//     isSyncRunning = true;

//     try {

//       console.log("Starting Sync...");

//       await syncData(io);

//     } catch (err) {

//       console.error("Sync Failed:", err.message);

//     } finally {

//       isSyncRunning = false;

//     }
//   };

//   // Run once when server starts
//   runSync();

//   // Run every minute
//   cron.schedule("* * * * *", async () => {

//     console.log("Running Scheduled Sync...");

//     await runSync();

//   });

// };
