"use client";
import { useEffect, useRef, useState } from "react";
import config from "@/config/canvas.json";
import { socket } from "@/app/socket";
import { Button } from "@/components/ui/button";

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(config.colors[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = config.gridSize;
    canvas.height = config.gridSize;
    const context = canvas.getContext("2d");
    ctxRef.current = context; // Use ref instead of state

    // Initialize canvas with white background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    context.strokeStyle = "#CCCCCC";
    for (let i = 0; i <= config.gridSize; i += 10) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, config.gridSize);
      context.moveTo(0, i);
      context.lineTo(config.gridSize, i);
      context.stroke();
    }

    // Fetch and render stored pixels
    const fetchPixels = async () => {
      try {
        const pixels = await getPixels();
        pixels.forEach(({ x, y, color }) => {
          drawPixel(x, y, color);
        });
      } catch (error) {
        console.error("Failed to fetch pixels:", error);
      }
    };

    fetchPixels();

    // Initialize socket connection
    const socketInitializer = async () => {
      socket.on("receiveUpdate", (data) => {
        drawPixel(data.x, data.y, data.color);
      });
    };

    socketInitializer();
  }, []);

  const drawPixel = (x, y, color) => {
    const ctx = ctxRef.current;
    if (!ctx) {
      console.warn("Context is not set yet.");
      return;
    }
    console.log("Drawing pixel at", x, y, "with color", color);
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x / 10) * 10, Math.floor(y / 10) * 10, 10, 10);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawPixel(x, y, currentColor);
    console.log(x, y, currentColor);
    socket.emit("updatePixels", { x, y, color: currentColor });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawPixel(x, y, currentColor);
    socket.emit("updatePixels", { x, y, color: currentColor });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        width={config.gridSize}
        height={config.gridSize}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border border-gray-300 cursor-crosshair"
      />
      <div className="mt-4 flex space-x-2">
        {config.colors.map((color) => (
          <Button
            key={color}
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
            onClick={() => setCurrentColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
