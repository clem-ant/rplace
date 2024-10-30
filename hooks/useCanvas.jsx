import socket from "@/app/socket";
import config from "@/config/canvas.json";
import { useCallback, useEffect, useState } from "react";
import getPixels from "@/app/canvas/getPixels.action";

export function useCanvas() {
  const [canvasData, setCanvasData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    const handleReceiveUpdate = (data) => {
      setCanvasData((prevData) => {
        const existingPixelIndex = prevData.findIndex(
          (pixel) => pixel.x === data.x && pixel.y === data.y
        );
        if (existingPixelIndex !== -1) {
          const newData = [...prevData];
          newData[existingPixelIndex] = data;
          return newData;
        }
        return [...prevData, data];
      });
    };

    socket.on("receiveUpdate", handleReceiveUpdate);

    const fetchInitialData = async () => {
      const data = await getPixels();
      setInitialData(data);
    };

    fetchInitialData();

    return () => {
      socket.off("receiveUpdate", handleReceiveUpdate);
    };
  }, []);

  useEffect(() => {
    if (initialData.length > 0) {
      setCanvasData(initialData);
    }
  }, [initialData]);

  const drawPixel = useCallback((x, y, color, userId) => {
    const newPixel = { x, y, color, userId };
    socket.emit("drawPixel", newPixel);
    setCanvasData((prevData) => {
      const existingPixelIndex = prevData.findIndex(
        (pixel) => pixel.x === x && pixel.y === y
      );
      if (existingPixelIndex !== -1) {
        const newData = [...prevData];
        newData[existingPixelIndex] = newPixel;
        return newData;
      }
      return [...prevData, newPixel];
    });
  }, []);

  const randomDrawPixel = useCallback(() => {
    const x = Math.floor(Math.random() * config.gridSize);
    const y = Math.floor(Math.random() * config.gridSize);
    drawPixel(
      x,
      y,
      "#" + Math.floor(Math.random() * 16777215).toString(16),
      "random"
    );
  }, [drawPixel]);

  return {
    canvasData,
    drawPixel,
    randomDrawPixel,
    gridSize: config.gridSize,
  };
}
