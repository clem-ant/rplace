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
          name: true,
        },
      },
    },
  });
  if (pixel && pixel.user && pixel.user.name) {
    const [firstName, lastName] = pixel.user.name.split(" ");
    pixel.user.name = `${firstName}.${lastName.charAt(0)}`;
  }
  return pixel;
}
