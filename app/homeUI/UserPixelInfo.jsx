"use client";
import { Button } from "@/components/ui/button";
import getPixel from "../canvas/getPixel.action";
import { Card, CardContent } from "@/components/ui/card";
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
        <Card className="bg-primary">
          <CardContent>
            <div className="flex flex-row items-center justify-center gap-2">
              x : {selectedCell.x}, y : {selectedCell.y}
            </div>
            {pixel && <p>Dessiné par {pixel.user.name}</p>}
            <Button onClick={buttonPress} variant="outline">
              Placer le pixel [ESPACE]
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
