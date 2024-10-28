"use client";
import { useCanvas } from "@/hooks/useCanvas";
import { useEffect, useRef, useState } from "react";

const Canvas = ({ selectedColor, mousePosition }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const { canvasData, drawPixel, gridSize, randomDrawPixel } = useCanvas();
  const [hoverCell, setHoverCell] = useState({ x: -1, y: -1 });
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const cellSize = 20; // Size of each cell in pixels

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    const context = canvas.getContext("2d");
    ctxRef.current = context;

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
    // randomDrawPixel();
  }, [canvasData, gridSize, hoverCell, scale, offset]);

  useEffect(() => {
    const context = ctxRef.current;
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
  }, [hoverCell]);

  const drawPixelOnCanvas = (x, y, color) => {
    const ctx = ctxRef.current;
    if (!ctx) {
      console.warn("Context is not set yet.");
      return;
    }
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width; // Calculate the horizontal scale
    const scaleY = canvasRef.current.height / rect.height; // Calculate the vertical scale

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / cellSize);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / cellSize);

    setHoverCell({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverCell({ x: -1, y: -1 });
  };

  const handleMouseClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width; // Calculate the horizontal scale
    const scaleY = canvasRef.current.height / rect.height; // Calculate the vertical scale

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / cellSize);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / cellSize);
    drawPixel(x, y, selectedColor);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
        onMouseLeave={handleMouseLeave}
        className="border border-gray-300 cursor-crosshair"
        style={{
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: "0 0",
        }}
      />
    </div>
  );
};

export default Canvas;
