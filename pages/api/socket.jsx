import { Server } from "socket.io";
import createPixel from "@/app/socket/createPixel.action";
import getPixelsCount from "@/app/canvas/getPIxelCount.action";
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

      socket.on("disconnect", () => {
        io.emit("updateClientCount", io.engine.clientsCount);
      });

      socket.on("drawPixel", async ({ x, y, color, userId }, callback) => {
        const pixelCount = await getPixelsCount({ userId });
        if (pixelCount.pixelCount <= 0) {
          callback({ error: "Vous n'avez plus de pixels" });
          return;
        }
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
        callback({ success: true });
      });
      socket.on("getCanvasData", (callback) => {
        callback(canvasData);
      });
    });
  }
  res.end();
}
