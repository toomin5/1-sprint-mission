import articleRepository from "../repositories/articleRepository.js";

export async function createArticleService(req) {
  const data = req.body;
  data.userId = req.user.userId;
  return articleRepository.createArticle(data);
}

export async function getArticleService(id) {
  return articleRepository.getArticle(id);
}

export async function updateArticleService(id, data) {
  return articleRepository.updateArticle(id, data);
}

export async function deleteArticleService(id) {
  return articleRepository.deleteArticle(id);
}

export async function getArticleListService(req) {
  const { page, pageSize, orderBy, keyword } = req.query;
  return articleRepository.getArticleList(
    (page - 1) * pageSize,
    pageSize,
    keyword,
    orderBy
  );
}

export async function createCommentService(req) {
  const { id: articleId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;
  return articleRepository.createComment(articleId, userId, content);
}

export async function getCommentListService(req) {
  const { id: articleId } = req.params;
  const { page, pageSize } = req.query;
  return articleRepository.getCommentList(
    articleId,
    (page - 1) * pageSize,
    pageSize
  );
}

export async function postArticlesLikeService(req) {
  const { userId } = req.user;
  const { articleId } = req.params;
  return articleRepository.postArticlesLike(userId, parseInt(articleId, 10));
}

export async function deleteArticlesLikeService(req) {
  const { userId } = req.user;
  const { articleId } = req.params;
  return articleRepository.deleteArticlesLike(userId, parseInt(articleId, 10));
}
