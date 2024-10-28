import { Server } from "socket.io";
import createPixel from "@/app/socket/createPixel.action";
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
      socket.on("drawPixel", async ({ x, y, color, userId }) => {
        console.log("drawPixel", { x, y, color, userId });
        const pixel = await createPixel({
          x,
          y,
          color,
          userId,
        });
        const existingPixelIndex = canvasData.findIndex(
          (pixel) => pixel.x === x && pixel.y === y
        );
        if (existingPixelIndex !== -1) {
          canvasData[existingPixelIndex] = pixel;
        } else {
          canvasData.push(pixel);
        }
        socket.broadcast.emit("receiveUpdate", pixel);
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
