"use server";
import prisma from "@/util/client";

export default async function getPixels() {
  const pixels = await prisma.pixel.findMany({
    select: {
      x: true,
      y: true,
      color: true,
    },
  });
  return pixels;
}
