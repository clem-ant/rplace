"use client";
import { useCanvas } from "@/hooks/useCanvas";
import { useEffect, useRef, useState } from "react";

const Canvas = ({ selectedColor }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { canvasData, availableColors, drawPixel, gridSize } = useCanvas();
  const [hoverCell, setHoverCell] = useState({ x: -1, y: -1 });

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

    // Draw hover highlight
    if (hoverCell.x >= 0 && hoverCell.y >= 0) {
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.strokeRect(
        hoverCell.x * cellSize,
        hoverCell.y * cellSize,
        cellSize,
        cellSize
      );
    }
  }, [canvasData, gridSize, hoverCell]);

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
    drawPixel(x, y, selectedColor);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);

    setHoverCell({ x, y });

    if (isDrawing) {
      drawPixel(x, y, selectedColor);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
    setHoverCell({ x: -1, y: -1 });
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
        onMouseLeave={handleMouseLeave}
        className="border border-gray-300 cursor-crosshair"
      />
    </div>
  );
};

export default Canvas;
