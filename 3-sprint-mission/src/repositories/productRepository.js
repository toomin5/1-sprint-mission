import { prismaClient } from "../lib/prismaClient.js";

async function save(userId, product) {
  return await prismaClient.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      user: {
        connect: { id: userId },
      },
    },
  });
}

async function getById(id) {
  const parseIntId = parseInt(id, 10);
  console.log("getbyId호출됨");
  return await prismaClient.product.findUnique({
    where: {
      id: parseIntId,
    },
  });
}

async function getUserId(userId) {
  const parseIntId = parseInt(userId, 10);
  return await prismaClient.product.findMany({
    where: {
      userId: parseIntId,
    },
  });
}

async function update(id, data) {
  return await prismaClient.product.update({
    where: {
      id: id,
    },
    data: data,
  });
}

async function remove(id, data) {
  return await prismaClient.product.delete({
    where: {
      id: id,
    },
    data: data,
  });
}

async function getProductList(page, pageSize, orderBy, keyword) {
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      }
    : undefined;

  try {
    const totalCount = await prismaClient.product.count({ where });
    const products = await prismaClient.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: orderBy === "recent" ? { id: "desc" } : { id: "asc" },
      where,
    });

    return { list: products, totalCount };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addLike(userId, productId) {
  return await prismaClient.productLikes.create({
    data: {
      userId,
      productId,
    },
  });
}

async function deleteLike(userId, productId) {
  return await prismaClient.productLikes.deleteMany({
    where: {
      userId,
      productId,
    },
  });
}

async function userLikeProducts(userId) {
  return await prismaClient.product.findMany({
    where: { ProductLikes: { some: { userId } } },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });
}

export default {
  save,
  remove,
  update,
  getById,
  getProductList,
  addLike,
  deleteLike,
  getUserId,
  userLikeProducts,
};
