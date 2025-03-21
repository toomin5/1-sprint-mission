import { create } from "superstruct";
import { prismaClient } from "../lib/prismaClient.js";

import {
  CreateProductBodyStruct,
  UpdateProductBodyStruct,
} from "../structs/productsStruct.js";
import { CreateCommentBodyStruct } from "../structs/commentsStruct.js";

export async function createProduct(req, res) {
  const { userId } = req.user;
  const { name, description, price, tags, images } = req.body;

  if (!userId) {
    const error = new Error("userId not found");
    error.code = 400;
    throw error;
  }

  const newProduct = await prismaClient.product.create({
    data: { name, description, price, tags, images, userId },
  });

  res.status(201).json(newProduct);
}

export async function getProduct(req, res) {
  const { id } = create(req.params, IdParamsStruct);

  const product = await prismaClient.product.findUnique({ where: { id } });
  if (!product) {
    const error = new Error("product not found");
    error.code = 404;
    throw error;
  }

  return res.send(product);
}

export async function updateProduct(req, res) {
  const { id } = create(req.params, IdParamsStruct);
  const { name, description, price, tags, images } = create(
    req.body,
    UpdateProductBodyStruct
  );

  const existingProduct = await prismaClient.product.findUnique({
    where: { id },
  });
  if (!existingProduct) {
    const error = new Error("product not found");
    error.code = 404;
    throw error;
  }

  const updatedProduct = await prismaClient.product.update({
    where: { id },
    data: { name, description, price, tags, images },
  });

  return res.send(updatedProduct);
}

export async function deleteProduct(req, res) {
  const { id } = create(req.params, IdParamsStruct);
  const existingProduct = await prismaClient.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    const error = new Error("product not found");
    error.code = 404;
    throw error;
  }

  await prismaClient.product.delete({ where: { id } });

  return res.status(204).send();
}

export async function getProductList(req, res) {
  const { page, pageSize, orderBy, keyword } = create(
    req.query,
    GetProductListParamsStruct
  );

  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      }
    : undefined;
  const totalCount = await prismaClient.product.count({ where });
  const products = await prismaClient.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === "recent" ? { id: "desc" } : { id: "asc" },
    where,
  });

  return res.send({
    list: products,
    totalCount,
  });
}

export async function createComment(req, res) {
  const { id: productId } = create(req.params, IdParamsStruct);
  const { content } = create(req.body, CreateCommentBodyStruct);
  const { userId } = req.user;

  const existingProduct = await prismaClient.product.findUnique({
    where: { id: productId },
  });
  if (!existingProduct) {
    const error = new Error("product not found");
    error.code = 404;
    throw error;
  }

  const comment = await prismaClient.comment.create({
    data: {
      productId,
      content,
      userId,
    },
  });

  return res.status(201).send(comment);
}

export async function getCommentList(req, res) {
  const { id: productId } = create(req.params, IdParamsStruct);
  const { cursor, limit } = create(req.query, GetCommentListParamsStruct);

  const existingProduct = await prismaClient.product.findUnique({
    where: { id: productId },
  });
  if (!existingProduct) {
    const error = new Error("product not found");
    error.code = 404;
    throw error;
  }

  const commentsWithCursorComment = await prismaClient.comment.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    where: { productId },
  });
  const comments = commentsWithCursorComment.slice(0, limit);
  const cursorComment = commentsWithCursorComment[comments.length - 1];
  const nextCursor = cursorComment ? cursorComment.id : null;

  return res.send({
    list: comments,
    nextCursor,
  });
}
