import articleRepository from "../repositories/articleRepository";

export interface ArticleData {
  title: string;
  content: string;
}

async function createArticle(userId: number, articleData: ArticleData) {
  const data = { ...articleData, userId };
  return articleRepository.save(data);
}

async function getArticle(id: number) {
  return articleRepository.getArticleById(id);
}

async function updateArticle(id: number, data: Partial<ArticleData>) {
  return articleRepository.update(id, data);
}

async function deleteArticle(id: number) {
  return articleRepository.remove(id);
}

async function getArticleList(
  page: number,
  pageSize: number,
  orderBy: string,
  keyword?: string
) {
  const where = keyword ? { title: { contains: keyword } } : {};
  const orderByObj = { createdAt: orderBy as "asc" | "desc" }; //강제변하ㅗㄴ
  return articleRepository.getArticleList(
    where,
    (page - 1) * pageSize,
    pageSize,
    orderByObj
  );
}

async function createComment(
  articleId: number,
  userId: number,
  content: string
) {
  return articleRepository.createComment({ articleId, userId, content });
}

async function getCommentList(
  articleId: number,
  page: number,
  pageSize: number
) {
  return articleRepository.getCommentList(
    articleId,
    (page - 1) * pageSize,
    pageSize
  );
}

async function postArticlesLike(userId: number, articleId: number) {
  return articleRepository.addLike(userId, articleId);
}

async function deleteArticlesLike(userId: number, articleId: number) {
  return articleRepository.removeLike(userId, articleId);
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
