"use server";
import prisma from "@/util/client";

export default async function getPixelsCount({ userId }) {
  const pixels = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      pixelCount: true,
    },
  });
  return pixels;
}
