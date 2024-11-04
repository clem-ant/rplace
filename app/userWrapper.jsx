"use client";
import { useState, useRef, useEffect } from "react";
import Canvas from "./canvas/Canvas";
import UserPixelInfo from "./homeUI/UserPixelInfo";
import { SessionProvider } from "next-auth/react";
import UserModalNotConnected from "./homeUI/UserModalNotConnected";
import UserModalNotEnoughPixels from "./homeUI/UserModalNotEnoughtPixels";
import CanvasInterface from "./interface/CanvasInterface";

export default function UserWrapper() {
  const [selectedColor, setSelectedColor] = useState("#222222"); // Default color
  const [scale, setScale] = useState(0.1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState({
    x: -1,
    y: -1,
    color: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNotEnoughPixelsOpen, setIsModalNotEnoughPixelsOpen] =
    useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleMouseDown = (event) => {
    isDragging.current = true;
    lastPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleSelectedCell = (x, y) => {
    setSelectedCell({ x, y });
  };

  const handleButtonPress = () => {
    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 100);
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;

    // Adjust the drag speed factor to increase more significantly as the scale decreases
    const dragSpeedFactor = 1 / scale; // This will be 10 when scale is 0.1, and 5 when scale is 0.2

    const deltaX = (event.clientX - lastPosition.current.x) * dragSpeedFactor;
    const deltaY = (event.clientY - lastPosition.current.y) * dragSpeedFactor;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    lastPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (event) => {
    const zoomFactor = event.deltaY < 0 ? 1.05 : 0.95;
    const newScale = scale * zoomFactor;

    // Ensure the scale remains within desired bounds
    setScale(Math.max(0.1, Math.min(1, newScale)));
  };

  return (
    <SessionProvider>
      <UserModalNotConnected
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UserModalNotEnoughPixels
        isModalOpen={isModalNotEnoughPixelsOpen}
        setIsModalOpen={setIsModalNotEnoughPixelsOpen}
      />

      <div
        id="canvas-container"
        className="w-full h-full cursor-grab bg-primary/20  "
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          id="painting"
          className={`w-full h-full ${
            scale >= 0.1 && scale <= 0.5 ? "cursor-crosshair" : "cursor-none"
          }`}
          ref={canvasRef}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px) `,
          }}
        >
          <Canvas
            selectedColor={selectedColor}
            setIsModalOpen={setIsModalOpen}
            selectedCell={selectedCell}
            handleSelectedCell={handleSelectedCell}
            isButtonPressed={isButtonPressed}
          />
        </div>
      </div>
      <CanvasInterface
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedCell={selectedCell}
        handleButtonPress={handleButtonPress}
      />
    </SessionProvider>
  );
}
