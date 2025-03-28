import prisma from "../lib/prismaClient.js";

async function create(article) {
  return await prisma.article.create({
    data: article,
  });
}

async function getById(id) {
  return await prisma.article.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
}
