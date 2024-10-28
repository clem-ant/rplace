"use client";
import { useState, useRef } from "react";
import Canvas from "./canvas/Canvas";
import UserColors from "./homeUI/UserColors";
import UserCount from "./homeUI/userCount";
import UserPlacePixel from "./homeUI/UserPlacePixel";

export default function UserWrapper() {
  const [selectedColor, setSelectedColor] = useState("#222222"); // Default color
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleWheel = (event) => {
    event.preventDefault(); // Prevent the default scroll behavior

    const zoomFactor = 0.1; // Adjust this value to control zoom speed
    const newScale = scale + (event.deltaY < 0 ? zoomFactor : -zoomFactor);

    // Ensure the scale doesn't go below a certain threshold
    if (newScale < 0.1) return;

    // Calculate the cursor's position relative to the canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const cursorX = (event.clientX - rect.left) / scale;
    const cursorY = (event.clientY - rect.top) / scale;

    // Calculate the new position to keep the cursor centered
    setPosition((prev) => ({
      x: prev.x - cursorX * (newScale - scale) + cursorX * (scale - newScale),
      y: prev.y - cursorY * (newScale - scale) + cursorY * (scale - newScale),
    }));

    setScale(newScale);
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    lastPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;
    const baseSpeedFactor = 2; // Base speed factor
    const maxSpeedFactor = 5; // Maximum speed factor limit
    const speedFactor = Math.min(baseSpeedFactor / scale, maxSpeedFactor); // Adjust speed inversely based on scale

    const dx = (event.clientX - lastPosition.current.x) * speedFactor;
    const dy = (event.clientY - lastPosition.current.y) * speedFactor;
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <>
      <div
        id="painting"
        className="w-full h-full"
        ref={canvasRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "0 0",
          cursor: isDragging.current ? "cursor-grabbing" : "cursor-grab",
        }}
      >
        <Canvas selectedColor={selectedColor} mousePosition={position} />
      </div>
      <div className="text-black absolute bottom-0 mx-auto p-4">
        <span>
          <UserCount />
        </span>
      </div>
      <div className="flex flex-row gap-4 justify-center absolute p-4 w-full bottom-0">
        <div className="flex flex-row gap-4">
          <UserColors
            onColorSelect={handleColorSelect}
            selectedColor={selectedColor}
          />
        </div>
      </div>
    </>
  );
}
