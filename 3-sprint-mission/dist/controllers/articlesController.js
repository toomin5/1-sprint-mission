"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticle = createArticle;
exports.getArticle = getArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
exports.getArticleList = getArticleList;
exports.createComment = createComment;
exports.getCommentList = getCommentList;
exports.postArticleLike = postArticleLike;
exports.deleteArticleLike = deleteArticleLike;
const articleService_1 = __importDefault(require("../services/articleService"));
function createArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        const articleData = req.body;
        const newArticle = yield articleService_1.default.createArticle(userId, articleData);
        res.status(201).json(newArticle);
    });
}
function getArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const article = yield articleService_1.default.getArticle(parseInt(id, 10));
        return res.send(article);
    });
}
function updateArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updateData = req.body;
        const updatedArticle = yield articleService_1.default.updateArticle(parseInt(id, 10), updateData);
        return res.send(updatedArticle);
    });
}
function deleteArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { id: userId } = req.user;
        yield articleService_1.default.deleteArticle(parseInt(id, 10));
        return res.status(204).send();
    });
}
function getArticleList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = parseInt(String(req.query.page), 10) || 1;
        const pageSize = parseInt(String(req.query.pageSize), 10) || 10;
        const orderBy = String(req.query.orderBy || "");
        const keyword = String(req.query.keyword || "");
        const result = yield articleService_1.default.getArticleList(page, pageSize, orderBy, keyword);
        return res.send(result);
    });
}
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: articleId } = req.params;
        const { content } = req.body;
        const { id: userId } = req.user;
        const comment = yield articleService_1.default.createComment(parseInt(articleId, 10), userId, content);
        return res.status(201).send(comment);
    });
}
function getCommentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleId = parseInt(req.params.id, 10);
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.limit, 10) || 10;
        const comments = yield articleService_1.default.getCommentList(articleId, page, pageSize);
        return res.send({ list: comments });
    });
}
function postArticleLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.user;
        const articleId = parseInt(req.params.articleId, 10);
        const updatedArticle = yield articleService_1.default.postArticlesLike(userId, articleId);
        return res.status(201).json(updatedArticle);
    });
}
function deleteArticleLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.user;
        const articleId = parseInt(req.params.articleId, 10);
        const updatedArticle = yield articleService_1.default.deleteArticlesLike(userId, articleId);
        return res.status(200).json(updatedArticle);
    });
}
