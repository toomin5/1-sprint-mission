import articleService from "../services/articleService.js";

async function createArticle(req, res) {
  const { userId } = req.user;
  const articleData = req.body;

  const newArticle = await articleService.createArticle(userId, articleData);

  res.status(201).json(newArticle);
}

async function getArticle(req, res) {
  const { id } = req.params;

  const article = await articleService.getArticle(parseInt(id, 10));

  return res.send(article);
}

async function updateArticle(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  const updatedArticle = await articleService.updateArticle(
    parseInt(id, 10),
    updateData
  );

  return res.send(updatedArticle);
}

async function deleteArticle(req, res) {
  const { id } = req.params;
  const { userId } = req.user;

  await articleService.deleteArticle(parseInt(id, 10), userId);

  return res.status(204).send();
}

async function getArticleList(req, res) {
  const { page = 1, pageSize = 10, orderBy, keyword } = req.query;

  const result = await articleService.getArticleList(
    page,
    pageSize,
    orderBy,
    keyword
  );

  return res.send(result);
}

async function createComment(req, res) {
  const { id: articleId } = req.params;
  const { content } = req.body;
  const { userId } = req.user;

  const comment = await articleService.createComment(
    parseInt(articleId, 10),
    userId,
    content
  );

  return res.status(201).send(comment);
}

async function getCommentList(req, res) {
  const { id: articleId } = req.params;
  const { limit = 10 } = req.query;

  const comments = await articleService.getCommentList(
    parseInt(articleId, 10),
    parseInt(limit, 10)
  );

  return res.send({ list: comments });
}

async function postArticleLike(req, res) {
  const { userId } = req.user;
  const { articleId } = req.params;

  const updatedArticle = await articleService.addLike(
    userId,
    parseInt(articleId, 10)
  );

  return res.status(201).json(updatedArticle);
}

async function deleteArticleLike(req, res) {
  const { userId } = req.user;
  const { articleId } = req.params;

  const updatedArticle = await articleService.removeLike(
    userId,
    parseInt(articleId, 10)
  );

  return res.status(200).json(updatedArticle);
}

export default {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleList,
  createComment,
  getCommentList,
  postArticleLike,
  deleteArticleLike,
};
