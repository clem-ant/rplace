"use client";
import { useCanvas } from "@/hooks/useCanvas";
import { useEffect, useRef, useState } from "react";

const Canvas = ({ selectedColor }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { canvasData, availableColors, drawPixel, gridSize } = useCanvas();
  const [currentColor, setCurrentColor] = useState(selectedColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = gridSize;
    canvas.height = gridSize;
    const context = canvas.getContext("2d");
    ctxRef.current = context;

    // Initialize canvas with white background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    context.strokeStyle = "#CCCCCC";
    for (let i = 0; i <= gridSize; i += 10) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, gridSize);
      context.moveTo(0, i);
      context.lineTo(gridSize, i);
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
    ctx.fillRect(Math.floor(x / 10) * 10, Math.floor(y / 10) * 10, 10, 10);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawPixel(x, y, currentColor);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawPixel(x, y, currentColor);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        width={gridSize}
        height={gridSize}
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
