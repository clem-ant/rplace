import { socket } from "@/app/socket";
import config from "@/config/canvas.json";
import { useCallback, useEffect, useState } from "react";

export function useCanvas() {
  const [canvasData, setCanvasData] = useState([]);
  const [availableColors, setAvailableColors] = useState(
    config.colors || ["#000000", "#FF0000", "#00FF00", "#0000FF"]
  );

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

    // Fetch initial canvas data
    socket.emit("getCanvasData", (initialData) => {
      console.log("initialData", initialData);
      setCanvasData(initialData);
    });

    return () => {
      socket.off("receiveUpdate", handleReceiveUpdate);
    };
  }, []);

  const drawPixel = useCallback((x, y, color) => {
    const newPixel = { x, y, color };
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

  return {
    canvasData,
    availableColors,
    drawPixel,
    gridSize: config.gridSize,
  };
}
