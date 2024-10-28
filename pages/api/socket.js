import { Server } from "socket.io";

let canvasData = [];

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      io.emit("updateClientCount", io.engine.clientsCount);
      socket.on("getClientCount", () => {
        io.emit("updateClientCount", io.engine.clientsCount);
      });
      socket.on("drawPixel", (data) => {
        console.log("drawPixel", data);
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
  }
  res.end();
}
