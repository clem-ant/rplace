"use server";
import prisma from "@/util/client";

export default async function create(data) {
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

    return pixel;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
