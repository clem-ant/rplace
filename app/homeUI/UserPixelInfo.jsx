import getPixel from "../canvas/getPixel.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useEffect, useState } from "react";

export default function UserPixelInfo({ selectedCell }) {
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

  return (
    <>
      {selectedCell && (
        <Card>
          <CardHeader>
            <CardTitle>Information du pixel</CardTitle>
            <CardDescription>
              Informations sur le pixel à la position sélectionnée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Coordonnées : {selectedCell.x}, {selectedCell.y}
            </p>
            {pixel && (
              <p>
                Pixel Data: {pixel.updatedAt.toLocaleString()} -{" "}
                {pixel.user.email}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
