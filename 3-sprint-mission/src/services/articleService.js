import articleRepository from "../repositories/articleRepository.js";

async function createArticle(req) {
  const data = req.body;
  data.userId = req.user.userId;
  return articleRepository.createArticle(data);
}

async function getArticle(id) {
  return articleRepository.getArticle(id);
}

async function updateArticle(id, data) {
  return articleRepository.updateArticle(id, data);
}

async function deleteArticle(id) {
  return articleRepository.deleteArticle(id);
}

async function getArticleList(page, pageSize, orderBy, keyword) {
  return articleRepository.getArticleList(
    (page - 1) * pageSize,
    pageSize,
    keyword,
    orderBy
  );
}

async function createComment(articleId, userId, content) {
  return articleRepository.createComment(articleId, userId, content);
}

async function getCommentList(articleId, page, pageSize) {
  return articleRepository.getCommentList(
    articleId,
    (page - 1) * pageSize,
    pageSize
  );
}

async function postArticlesLike(userId, articleId) {
  return articleRepository.postArticlesLike(userId, parseInt(articleId, 10));
}

async function deleteArticlesLike(userId, articleId) {
  return articleRepository.deleteArticlesLike(userId, parseInt(articleId, 10));
}

export default {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleList,
  createComment,
  getCommentList,
  postArticlesLike,
  deleteArticlesLike,
};
