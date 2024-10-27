"use client";
import { useCanvas } from "@/hooks/useCanvas";
import { useEffect, useRef, useState } from "react";

const Canvas = ({ selectedColor }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { canvasData, availableColors, drawPixel, gridSize } = useCanvas();
  const [currentColor, setCurrentColor] = useState(selectedColor);

  const cellSize = 10; // Size of each cell in pixels

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    const context = canvas.getContext("2d");
    ctxRef.current = context;

    // Initialize canvas with white background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    context.strokeStyle = "#CCCCCC";
    for (let i = 0; i <= gridSize; i++) {
      context.beginPath();
      context.moveTo(i * cellSize, 0);
      context.lineTo(i * cellSize, canvas.height);
      context.moveTo(0, i * cellSize);
      context.lineTo(canvas.width, i * cellSize);
      context.stroke();
    }

    // Render stored pixels from canvasData
    canvasData.forEach(({ x, y, color }) => {
      drawPixelOnCanvas(x, y, color);
    });
  }, [canvasData, gridSize]);

  const drawPixelOnCanvas = (x, y, color) => {
    const ctx = ctxRef.current;
    if (!ctx) {
      console.warn("Context is not set yet.");
      return;
    }
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    drawPixel(x, y, currentColor);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    drawPixel(x, y, currentColor);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        width={gridSize * cellSize}
        height={gridSize * cellSize}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border border-gray-300 cursor-crosshair"
      />
    </div>
  );
};

export default Canvas;
