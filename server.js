const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    io.emit("updateClientCount", io.engine.clientsCount);
    socket.on("getClientCount", () => {
      io.emit("updateClientCount", io.engine.clientsCount);
    });
    socket.on("disconnect", () => {
      io.emit("updateClientCount", io.engine.clientsCount);
    });
    // Move the updatePixels listener inside the connection event
    socket.on("updatePixels", (data) => {
      // Broadcast the update to all connected clients
      socket.broadcast.emit("receiveUpdate", data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});