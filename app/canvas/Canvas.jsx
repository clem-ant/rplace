"use client";
import { useCanvas } from "@/hooks/useCanvas";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import getPixelsCount from "./getPixels.action";

const Canvas = ({ selectedColor, handleClickPixel, setIsModalOpen }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { canvasData, drawPixel, gridSize } = useCanvas();
  const [hoverCell, setHoverCell] = useState({ x: -1, y: -1 });
  const cellSize = 20; // Size of each cell in pixels
  useEffect(() => {
    canvasData.forEach(({ x, y, color }) => {
      drawPixelOnCanvas(x, y, color);
    });
  }, [canvasData]);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    const context = canvas.getContext("2d");
    ctxRef.current = context;

    // Clear the canvas before redrawing
    context.clearRect(0, 0, canvas.width, canvas.height);

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

    // Draw pixels from canvasData
    canvasData.forEach(({ x, y, color }) => {
      drawPixelOnCanvas(x, y, color);
    });
  }, [canvasData, gridSize, hoverCell]);

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

  const handleMouseClick = async (e) => {
    if (!userId) {
      setIsModalOpen(true);
      return;
    }
    const pixelsCount = await getPixelsCount({ userId });
    if (pixelsCount.pixelNumber <= 0) {
      setIsModalOpen(true);
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width; // Calculate the horizontal scale
    const scaleY = canvasRef.current.height / rect.height; // Calculate the vertical scale

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / cellSize);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / cellSize);
    drawPixel(x, y, selectedColor, userId);
    handleClickPixel(x, y, selectedColor);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
        className="border border-gray-300 cursor-crosshair"
      />
    </div>
  );
};

export default Canvas;
