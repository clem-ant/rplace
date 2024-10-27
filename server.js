const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// Initialize canvas data
let canvasData = [];

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    io.emit("updateClientCount", io.engine.clientsCount);
    socket.on("getClientCount", () => {
      io.emit("updateClientCount", io.engine.clientsCount);
    });
    socket.on("drawPixel", (data) => {
      console.log("drawPixel", data);
      // Check if the pixel already exists and update it, or add a new one
      const existingPixelIndex = canvasData.findIndex(
        (pixel) => pixel.x === data.x && pixel.y === data.y
      );
      if (existingPixelIndex !== -1) {
        canvasData[existingPixelIndex] = data;
      } else {
        canvasData.push(data);
      }
      socket.broadcast.emit("receiveUpdate", data);
    });
    socket.on("getCanvasData", (callback) => {
      callback(canvasData);
    });
    socket.on("disconnect", () => {
      io.emit("updateClientCount", io.engine.clientsCount);
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
