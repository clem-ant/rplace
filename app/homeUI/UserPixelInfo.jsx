"use client";
import { Button } from "@/components/ui/button";
import getPixel from "../canvas/getPixel.action";
import React, { useEffect, useState } from "react";

export default function UserPixelInfo({ buttonPress, selectedCell }) {
  const [pixel, setPixel] = useState(null);

  useEffect(() => {
    if (selectedCell) {
      const fetchPixel = async () => {
        const pixelData = await getPixel(selectedCell.x, selectedCell.y);
        setPixel(pixelData);
      };
      fetchPixel();
    }
  }, [selectedCell]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent default spacebar scrolling behavior
        buttonPress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [buttonPress]);

  return (
    <>
      {selectedCell && (
        <div className="flex flex-col gap-2 backdrop-blur-xl bg-primary/20 border-none shadow-xl p-4 rounded-xl justify-center items-center">
          <div>
            x : {selectedCell.x}, y : {selectedCell.y}
          </div>
          {pixel && (
            <p>
              Dessiné par <span className="font-bold">{pixel.user.name}</span>
            </p>
          )}
          <Button onClick={buttonPress}>Placer le pixel [ESPACE]</Button>
        </div>
      )}
    </>
  );
}
