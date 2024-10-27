import prisma from "@/util/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const pixels = await prisma.pixel.findMany({
        select: {
          x: true,
          y: true,
          color: true,
        },
      });
      res.status(200).json(pixels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pixels" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
