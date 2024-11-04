import React from "react";
import UserInformation from "../homeUI/UserInformation";
import UserCount from "../homeUI/userCount";
import UserColors from "../homeUI/UserColors";
import UserPixelInfo from "../homeUI/UserPixelInfo";

export default function CanvasInterface({
  selectedColor,
  setSelectedColor,
  selectedCell,
  handleButtonPress,
}) {
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  return (
    <>
      <div className="absolute top-0 right-0 p-4 z-10">
        <UserInformation />
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <span>
          <UserCount />
        </span>
      </div>
      <div className="flex flex-wrap gap-2 w-fit fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4">
        <UserColors
          onColorSelect={handleColorSelect}
          selectedColor={selectedColor}
        />
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        {selectedCell.x !== -1 && selectedCell.y !== -1 && (
          <UserPixelInfo
            buttonPress={handleButtonPress}
            selectedCell={selectedCell}
          />
        )}
      </div>
    </>
  );
}
