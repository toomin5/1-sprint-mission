import { prismaClient } from "../lib/prismaClient.js";

async function save(data) {
  return await prismaClient.article.create({
    data,
  });
}

async function getArticleById(id) {
  return await prismaClient.article.findUnique({
    where: { id },
  });
}

async function update(id, data) {
  return await prismaClient.article.update({
    where: { id },
    data,
  });
}

async function remove(id) {
  return await prismaClient.article.delete({
    where: { id },
  });
}

async function getArticleList(where, skip, take, orderBy) {
  const totalCount = await prismaClient.article.count({
    where,
  });
  const articles = await prismaClient.article.findMany({
    skip,
    take,
    orderBy,
    where,
  });
  return { list: articles, totalCount };
}

async function createComment(data) {
  return await prismaClient.comment.create({
    data,
  });
}

async function getCommentList(articleId, page, pageSize) {
  const comments = await prismaClient.comment.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { articleId },
    orderBy: { createdAt: "desc" },
  });
  return { list: comments };
}

async function addLike(userId, articleId) {
  return await prismaClient.articleLikes.create({
    data: { userId, articleId },
  });
}

async function removeLike(userId, articleId) {
  return await prismaClient.articleLikes.deleteMany({
    where: { userId, articleId },
  });
}

async function getArticleLikeCount(id) {
  return await prismaClient.article.findUnique({
    where: { id },
  });
}

export default {
  removeLike,
  getArticleLikeCount,
  addLike,
  getCommentList,
  createComment,
  getArticleList,
  remove,
  update,
  getArticleById,
  save,
};
