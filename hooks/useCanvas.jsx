import socket from "@/app/socket";
import config from "@/config/canvas.json";
import { useCallback, useEffect, useState } from "react";
import getPixels from "@/app/canvas/getPixels.action";
import toast from "react-hot-toast";

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

  const drawPixel = useCallback(async (x, y, color, userId) => {
    const newPixel = { x, y, color, userId };

    try {
      const response = await new Promise((resolve, reject) => {
        socket.emit("drawPixel", newPixel, (response) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response);
          }
        });
      });

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
    } catch (error) {
      toast.error(error);
      return; // Breaks out of the function if there's an error
    }
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
