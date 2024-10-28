// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config({ path: ".env.local" });
const bcrypt = require("bcrypt");
async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      username: "exampleUser",
      password: bcrypt.hashSync("examplePassword", 10),
      pixelNumber: 100,
    },
  });

  // Create a pixel
  await prisma.pixel.create({
    data: {
      x: 0,
      y: 0,
      color: "#FF0000",
      userId: user.id,
    },
  });

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
