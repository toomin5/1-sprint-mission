import { PrismaClient } from "@prisma/client";
import PRODUCTS, { ARTICLES } from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.comment.deleteMany();

  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });
  await prisma.article.createMany({
    data: ARTICLES,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
