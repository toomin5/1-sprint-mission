import { prismaClient } from "../lib/prismaClient";
import { ArticleData } from "../services/articleService";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentData {
  articleId: number;
  userId: number;
  content: string;
}

async function save(data: { title: string; content: string; userId: number }) {
  return await prismaClient.article.create({
    data,
  });
}

async function getArticleById(id: number) {
  return await prismaClient.article.findUnique({
    where: { id },
  });
}

async function update(id: number, data: Partial<ArticleData>) {
  return await prismaClient.article.update({
    where: { id },
    data,
  });
}

async function remove(id: number) {
  return await prismaClient.article.delete({
    where: { id },
  });
}

async function getArticleList(
  where: Record<string, unknown>,
  skip: number,
  take: number,
  orderBy: Record<string, "asc" | "desc">
): Promise<{ list: Article[]; totalCount: number }> {
  const totalCount = await prismaClient.article.count({
    where,
  });
  const articles = await prismaClient.article.findMany({
    where,
    skip,
    take,
    orderBy,
  });
  return { list: articles, totalCount };
}

async function createComment(data: CommentData) {
  return await prismaClient.comment.create({
    data,
  });
}

async function getCommentList(
  articleId: number,
  page: number,
  pageSize: number
) {
  const comments = await prismaClient.comment.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { articleId },
    orderBy: { createdAt: "desc" },
  });
  return { list: comments };
}

async function addLike(userId: number, articleId: number) {
  return await prismaClient.articleLikes.create({
    data: { userId, articleId },
  });
}

async function removeLike(userId: number, articleId: number) {
  return await prismaClient.articleLikes.deleteMany({
    where: { userId, articleId },
  });
}

async function getArticleLikeCount(id: number) {
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
