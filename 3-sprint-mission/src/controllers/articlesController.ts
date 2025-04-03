import { Request, Response, NextFunction, RequestHandler } from "express";
import articleService from "../services/articleService";

export async function createArticle(req: Request, res: Response) {
  const userId = req.user.id;
  const articleData = req.body;

  const newArticle = await articleService.createArticle(userId, articleData);

  res.status(201).json(newArticle);
}

export async function getArticle(req: Request, res: Response) {
  const { id } = req.params;

  const article = await articleService.getArticle(parseInt(id, 10));

  return res.send(article);
}

export async function updateArticle(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;

  const updatedArticle = await articleService.updateArticle(
    parseInt(id, 10),
    updateData
  );

  return res.send(updatedArticle);
}

export async function deleteArticle(req: Request, res: Response) {
  const { id } = req.params;
  const { id: userId } = req.user;

  await articleService.deleteArticle(parseInt(id, 10));

  return res.status(204).send();
}

export async function getArticleList(req: Request, res: Response) {
  const page = parseInt(String(req.query.page), 10) || 1;
  const pageSize = parseInt(String(req.query.pageSize), 10) || 10;
  const orderBy = String(req.query.orderBy || "");
  const keyword = String(req.query.keyword || "");

  const result = await articleService.getArticleList(
    page,
    pageSize,
    orderBy,
    keyword
  );

  return res.send(result);
}

export async function createComment(req: Request, res: Response) {
  const { id: articleId } = req.params;
  const { content } = req.body;
  const { id: userId } = req.user;

  const comment = await articleService.createComment(
    parseInt(articleId, 10),
    userId,
    content
  );

  return res.status(201).send(comment);
}

export async function getCommentList(req: Request, res: Response) {
  const articleId = parseInt(req.params.id, 10);
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.limit as string, 10) || 10;
  const comments = await articleService.getCommentList(
    articleId,
    page,
    pageSize
  );

  return res.send({ list: comments });
}

export async function postArticleLike(req: Request, res: Response) {
  const { id: userId } = req.user;
  const articleId = parseInt(req.params.articleId, 10);

  const updatedArticle = await articleService.postArticlesLike(
    userId,
    articleId
  );

  return res.status(201).json(updatedArticle);
}

export async function deleteArticleLike(req: Request, res: Response) {
  const { id: userId } = req.user;
  const articleId = parseInt(req.params.articleId, 10);

  const updatedArticle = await articleService.deleteArticlesLike(
    userId,
    articleId
  );

  return res.status(200).json(updatedArticle);
}
