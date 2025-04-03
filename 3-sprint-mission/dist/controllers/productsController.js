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
exports.createProduct = createProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductList = getProductList;
exports.createComment = createComment;
exports.getCommentList = getCommentList;
exports.postProductsLike = postProductsLike;
exports.deleteProductsLike = deleteProductsLike;
exports.getUserProducts = getUserProducts;
exports.getUserLikeProducts = getUserLikeProducts;
const prismaClient_1 = require("../lib/prismaClient");
const productService_1 = __importDefault(require("../services/productService"));
const commentsStruct_1 = require("../structs/commentsStruct");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.user;
        const product = req.body;
        const newProduct = yield productService_1.default.createProduct(userId, product);
        res.status(201).json(newProduct);
    });
}
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const product = yield productService_1.default.getProduct(id);
        return res.send(product);
    });
}
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const updatedProduct = yield productService_1.default.updateProduct(id, data);
        return res.send(updatedProduct);
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const userId = req.user.id;
        yield productService_1.default.removeProduct(id, userId);
        return res.status(200).send({ message: "deleted!" });
    });
}
function getProductList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = 1, pageSize = 10, orderBy, keyword } = req.query;
        try {
            const result = yield productService_1.default.getProductList(page, pageSize, orderBy, keyword);
            return res.send(result);
        }
        catch (error) {
            return res.status(500).send({ error: error.message });
        }
    });
}
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: productId } = create(req.params, IdParamsStruct);
        const { content } = create(req.body, commentsStruct_1.CreateCommentBodyStruct);
        const { userId } = req.user;
        const existingProduct = yield prismaClient_1.prismaClient.product.findUnique({
            where: { id: productId },
        });
        if (!existingProduct) {
            const error = new Error("product not found");
            error.code = 404;
            throw error;
        }
        const comment = yield prismaClient_1.prismaClient.comment.create({
            data: {
                productId,
                content,
                userId,
            },
        });
        return res.status(201).send(comment);
    });
}
function getCommentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: productId } = create(req.params, IdParamsStruct);
        const { cursor, limit } = create(req.query, GetCommentListParamsStruct);
        const existingProduct = yield prismaClient_1.prismaClient.product.findUnique({
            where: { id: productId },
        });
        if (!existingProduct) {
            const error = new Error("product not found");
            error.code = 404;
            throw error;
        }
        const commentsWithCursorComment = yield prismaClient_1.prismaClient.comment.findMany({
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
    });
}
function postProductsLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.user;
        const { productId } = req.params;
        try {
            const like = yield productService_1.default.addLike(userId, productId);
            return res.status(201).send(like);
        }
        catch (error) {
            if (error.message === "Product not found") {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(500).json({ message: "Server error", error });
        }
    });
}
// 유저정보를 가져온다 -> 상품id가져오기 -> 좋아요 버튼 -> 증가 -> productlikes에 유저,상품정보 업데이트
// 상품좋아요를 누른 유저들중에 로그인한 유저가 있다면 에러
function deleteProductsLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.user;
        const { productId } = req.params;
        try {
            const like = yield productService_1.default.deleteLike(userId, productId);
            return res.status(201).send(like);
        }
        catch (error) {
            if (error.message === "Product not found") {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(500).json({ message: "Server error", error });
        }
    });
}
function getUserProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const products = yield productService_1.default.getUserProducts(userId);
        return res.status(200).json({ products });
    });
}
function getUserLikeProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.user;
        console.log("userId:", userId);
        const products = yield productService_1.default.getUserLikeProducts(userId);
        return res.status(200).send(products);
    });
}
