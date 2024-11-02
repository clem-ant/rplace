"use server";
import prisma from "@/util/client";

export default async function getPixel(x, y) {
  const pixel = await prisma.pixel.findUnique({
    where: {
      x_y: { x: x, y: y },
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  return pixel;
}
