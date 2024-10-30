"use client";
import { useState, useRef } from "react";
import Canvas from "./canvas/Canvas";
import UserColors from "./homeUI/UserColors";
import UserCount from "./homeUI/userCount";
import UserPixelInfo from "./homeUI/UserPixelInfo";
import { SessionProvider } from "next-auth/react";
import UserModalNotConnected from "./homeUI/UserModalNotConnected";
import LoginBtn from "@/components/login-btn";

export default function UserWrapper() {
  const [selectedColor, setSelectedColor] = useState("#222222"); // Default color
  const [scale, setScale] = useState(0.2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const [clickedPixel, setClickedPixel] = useState({
    x: -1,
    y: -1,
    color: "#222222",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickPixel = (x, y, color) => {
    setClickedPixel({ x, y, color });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    lastPosition.current = { x: event.clientX, y: event.clientY };
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

    const rect = canvasRef.current.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    // Calculate the new position based on the zoom
    const beforeScaleX = (cursorX - position.x) / scale;
    const beforeScaleY = (cursorY - position.y) / scale;
    const afterScaleX = (cursorX - position.x) / newScale;
    const afterScaleY = (cursorY - position.y) / newScale;

    setPosition((prev) => ({
      x: prev.x + (beforeScaleX - afterScaleX),
      y: prev.y + (beforeScaleY - afterScaleY),
    }));
  };

  return (
    <SessionProvider>
      <UserModalNotConnected
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <div
        id="canvas-container"
        className="w-full h-full cursor-grab bg-gray-200"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          id="painting"
          className="w-full h-full"
          ref={canvasRef}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px) `,
          }}
        >
          <Canvas
            selectedColor={selectedColor}
            handleClickPixel={handleClickPixel}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
      {clickedPixel.x !== -1 && clickedPixel.y !== -1 && (
        <UserPixelInfo clickedPixel={clickedPixel} />
      )}
      <div className="absolute top-0 right-0 p-4 z-10">
        <LoginBtn />
      </div>
      <div className="flex flex-row gap-4 justify-center absolute p-4 w-full bottom-0">
        <div className="absolute bottom-0 left-0 p-4">
          <span>
            <UserCount />
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <UserColors
            onColorSelect={handleColorSelect}
            selectedColor={selectedColor}
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 p-4"></div>
    </SessionProvider>
  );
}
