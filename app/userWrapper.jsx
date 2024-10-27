"use client";

import { useState } from "react";
import Canvas from "./canvas/Canvas";
import UserColors from "./homeUI/UserColors";
import UserCount from "./homeUI/userCount";

export default function UserWrapper() {
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color

  const handleColorSelect = (color) => {
    console.log("handleColorSelect", color);
    setSelectedColor(color);
  };

  return (
    <>
      <div id="painting" className="w-full h-full">
        <Canvas selectedColor={selectedColor} />
      </div>
      <div className="text-black absolute bottom-0 mx-auto p-4">
        <span>
          <UserCount />
        </span>
        {/* <UserWelcome /> */}
      </div>
      <div className="flex flex-row gap-4 justify-center absolute p-4 w-full bottom-0">
        <UserColors
          onColorSelect={handleColorSelect}
          selectedColor={selectedColor}
        />
      </div>
    </>
  );
}
