require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`Client Connected : ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client Disconnected : ${socket.id}`);
  });
});

require("./jobs/sync.job")(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Internal Portal running on ${PORT}`);
});