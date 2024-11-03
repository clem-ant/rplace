"use server";
import prisma from "@/util/client";

export default async function createPixel(data) {
  try {
    const pixel = await prisma.pixel.upsert({
      where: {
        x_y: { x: data.x, y: data.y },
      },
      update: {
        color: data.color,
        userId: data.userId,
      },
      create: {
        x: data.x,
        y: data.y,
        color: data.color,
        userId: data.userId,
      },
    });

    // Enregistrer l'historique du pixel
    await prisma.pixelHistory.create({
      data: {
        x: data.x,
        y: data.y,
        color: data.color,
        userId: data.userId,
      },
    });

    // Update the user's pixel count
    await prisma.user.update({
      where: { id: data.userId },
      data: { pixelCount: { decrement: 1 } },
    });

    return pixel;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
