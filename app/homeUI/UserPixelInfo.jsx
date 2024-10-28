import React from "react";

export default function UserPixelInfo({ clickedPixel, pixelData }) {
  return (
    <div className="flex flex-col items-center justify-center absolute bottom-0 right-0 p-4">
      <div className="flex flex-row items-center justify-center gap-2">
        {pixelData && (
          <>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: clickedPixel.color }}
            ></div>
            <h4>Pixel : </h4>
            {/* <p>Placed by : {pixelData.user}</p>
            <p>Placed at : {pixelData.timestamp}</p> */}
            <h4>Coordinates : </h4>
            <h1>
              {clickedPixel.x}, {clickedPixel.y}
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
