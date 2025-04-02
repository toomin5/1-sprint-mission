import { prismaClient } from "../lib/prismaClient.js";
import productService from "../services/productService.js";

import { CreateCommentBodyStruct } from "../structs/commentsStruct.js";

export async function createProduct(req, res) {
  const { userId } = req.user;
  const product = req.body;

  const newProduct = await productService.createProduct(userId, product);

  res.status(201).json(newProduct);
}

export async function getProduct(req, res) {
  const { id } = req.params;

  const product = await productService.getProduct(id);

  return res.send(product);
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;

  const updatedProduct = await productService.updateProduct(id, data);

  return res.send(updatedProduct);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  await productService.removeProduct(id, userId);

  return res.status(200).send({ message: "deleted!" });
}

export async function getProductList(req, res) {
  const { page = 1, pageSize = 10, orderBy, keyword } = req.query;

  try {
    const result = await productService.getProductList(
      page,
      pageSize,
      orderBy,
      keyword
    );
    return res.send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
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

export async function postProductsLike(req, res) {
  const { userId } = req.user;
  const { productId } = req.params;
  try {
    const like = await productService.addLike(userId, productId);
    return res.status(201).send(like);
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(500).json({ message: "Server error", error });
  }
}

// 유저정보를 가져온다 -> 상품id가져오기 -> 좋아요 버튼 -> 증가 -> productlikes에 유저,상품정보 업데이트
// 상품좋아요를 누른 유저들중에 로그인한 유저가 있다면 에러

export async function deleteProductsLike(req, res) {
  const { userId } = req.user;
  const { productId } = req.params;

  try {
    const like = await productService.deleteLike(userId, productId);
    return res.status(201).send(like);
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(500).json({ message: "Server error", error });
  }
}

export async function getUserProducts(req, res) {
  const { userId } = req.params;
  const products = await productService.getUserProducts(userId);

  return res.status(200).json({ products });
}

export async function getUserLikeProducts(req, res) {
  const { userId } = req.user;
  console.log("userId:", userId);
  const products = await productService.getUserLikeProducts(userId);
  return res.status(200).send(products);
}
