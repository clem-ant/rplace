"use client";
import { useCanvas } from "@/hooks/useCanvas";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import getPixelsCount from "./getPixels.action";
import config from "@/config/canvas.json";
const Canvas = ({
  selectedColor,
  setIsModalOpen,
  selectedCell,
  handleSelectedCell,
  isButtonPressed,
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { canvasData, drawPixel, gridSize } = useCanvas();
  const [hoverCell, setHoverCell] = useState({ x: -1, y: -1 });

  const cellSize = config.cellSize; // Size of each cell in pixels
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
    drawSelectedCell();
  }, [canvasData, gridSize, hoverCell, selectedCell, selectedColor]);

  useEffect(() => {
    const context = ctxRef.current;
    if (hoverCell.x >= 0 && hoverCell.y >= 0) {
      context.strokeStyle = "black";
      context.lineWidth = 2;
      const cornerSize = 5;
      context.beginPath();
      context.moveTo(hoverCell.x * cellSize, hoverCell.y * cellSize);
      context.lineTo(
        hoverCell.x * cellSize + cornerSize,
        hoverCell.y * cellSize
      );
      context.moveTo(hoverCell.x * cellSize, hoverCell.y * cellSize);
      context.lineTo(
        hoverCell.x * cellSize,
        hoverCell.y * cellSize + cornerSize
      );
      context.moveTo(hoverCell.x * cellSize + cellSize, hoverCell.y * cellSize);
      context.lineTo(
        hoverCell.x * cellSize + cellSize - cornerSize,
        hoverCell.y * cellSize
      );
      context.moveTo(hoverCell.x * cellSize + cellSize, hoverCell.y * cellSize);
      context.lineTo(
        hoverCell.x * cellSize + cellSize,
        hoverCell.y * cellSize + cornerSize
      );
      context.moveTo(hoverCell.x * cellSize, hoverCell.y * cellSize + cellSize);
      context.lineTo(
        hoverCell.x * cellSize + cornerSize,
        hoverCell.y * cellSize + cellSize
      );
      context.moveTo(hoverCell.x * cellSize, hoverCell.y * cellSize + cellSize);
      context.lineTo(
        hoverCell.x * cellSize,
        hoverCell.y * cellSize + cellSize - cornerSize
      );
      context.moveTo(
        hoverCell.x * cellSize + cellSize,
        hoverCell.y * cellSize + cellSize
      );
      context.lineTo(
        hoverCell.x * cellSize + cellSize - cornerSize,
        hoverCell.y * cellSize + cellSize
      );
      context.moveTo(
        hoverCell.x * cellSize + cellSize,
        hoverCell.y * cellSize + cellSize
      );
      context.lineTo(
        hoverCell.x * cellSize + cellSize,
        hoverCell.y * cellSize + cellSize - cornerSize
      );
      context.stroke();
    }
  }, [hoverCell]);

  const drawSelectedCell = () => {
    const context = ctxRef.current;
    if (selectedCell.x >= 0 && selectedCell.y >= 0) {
      context.strokeStyle = selectedColor; // Different color for selected cell
      context.lineWidth = 2;
      context.strokeRect(
        selectedCell.x * cellSize,
        selectedCell.y * cellSize,
        cellSize,
        cellSize
      );
    }
  };

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

  const handleMouseClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / cellSize);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / cellSize);

    handleSelectedCell(x, y);
  };
  const confirmPixelPlacement = async () => {
    if (!userId) {
      setIsModalOpen(true);
      return;
    }
    const pixelsCount = await getPixelsCount({ userId });
    if (pixelsCount.pixelNumber <= 0) {
      setIsModalOpen(true);
      return;
    }

    const result = await drawPixel(
      selectedCell.x,
      selectedCell.y,
      selectedColor,
      userId
    );
    if (result) {
      session.user.pixelCount = session.user.pixelCount - 1;
    }
  };

  useEffect(() => {
    if (isButtonPressed) {
      confirmPixelPlacement();
    }
  }, [isButtonPressed]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
        className="border border-gray-300 cursor-none"
      />
    </div>
  );
};

export default Canvas;
