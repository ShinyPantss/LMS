const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Frontend" },
        { name: "Backend" },
        { name: "FullStack" },
        { name: "DevOps" },
        { name: "Design" },
      ],
    });
  } catch (e) {
    console.log(e);
  } finally {
    await db.$disconnect();
  }
}
main();