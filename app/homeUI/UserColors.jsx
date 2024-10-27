"use client";
import config from "@/config/canvas.json";

const UserColors = ({ onColorSelect, selectedColor }) => {
  const { colors } = config;

  const handleColorClick = (color) => {
    onColorSelect(color);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer transition-all duration-100 flex items-center justify-center ${
            selectedColor === color
              ? "border-gray-500 ring-2 ring-gray-300"
              : ""
          }`}
          title={color}
          onClick={() => handleColorClick(color)}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default UserColors;
