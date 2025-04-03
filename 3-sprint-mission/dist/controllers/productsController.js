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
const commentService_1 = __importDefault(require("../services/commentService"));
const productService_1 = __importDefault(require("../services/productService"));
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            throw new Error("user not found");
        }
        const { id: userId } = req.user;
        const product = req.body;
        const newProduct = yield productService_1.default.createProduct(userId, product);
        res.status(201).json(newProduct);
    });
}
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = parseInt(req.params.id, 10);
        const product = yield productService_1.default.getProduct(productId);
        return res.send(product);
    });
}
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        const updatedProduct = yield productService_1.default.updateProduct(id, data);
        return res.send(updatedProduct);
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            throw new Error("user not found");
        }
        const id = parseInt(req.params.id, 10);
        const userId = req.user.id;
        yield productService_1.default.removeProduct(id, userId);
        return res.status(200).send({ message: "deleted!" });
    });
}
function getProductList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        function isValidOrder(value) {
            return value === "recent" || value === "oldset";
        }
        const orderBy = isValidOrder(req.query.orderBy)
            ? req.query.orderBy
            : "recent";
        const keyword = req.query.orderBy;
        try {
            const result = yield productService_1.default.getProductList(page, pageSize, orderBy, keyword);
            return res.send(result);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(500).send({ error: error.message });
        }
    });
}
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            throw new Error("user not found");
        }
        try {
            const productId = parseInt(req.params.id, 10);
            const { content } = req.body;
            const { id: userId } = req.user;
            const comment = yield commentService_1.default.createComment(productId, content, userId);
            return res.status(201).send(comment);
        }
        catch (error) {
            return res.status(500).send("internal server error");
        }
    });
}
function getCommentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = parseInt(req.params.id, 10);
            const comments = yield commentService_1.default.getComments(productId);
            return res.status(200).send(comments);
        }
        catch (error) {
            return res.status(500).send("internal server error");
        }
    });
}
function postProductsLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            throw new Error("user not found");
        }
        const { id: userId } = req.user;
        const productId = parseInt(req.params.id, 10);
        try {
            const like = yield productService_1.default.addLike(userId, productId);
            return res.status(201).send(like);
        }
        catch (error) {
            if (error instanceof Error)
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
        if (!req.user) {
            throw new Error("user not found");
        }
        const { id: userId } = req.user;
        const productId = parseInt(req.params.id, 10);
        try {
            const like = yield productService_1.default.deleteLike(userId, productId);
            return res.status(201).send(like);
        }
        catch (error) {
            if (error instanceof Error)
                if (error.message === "Product not found") {
                    return res.status(404).json({ message: "Product not found" });
                }
            return res.status(500).json({ message: "Server error", error });
        }
    });
}
function getUserProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id, 10);
        const products = yield productService_1.default.getUserProducts(userId);
        return res.status(200).json({ products });
    });
}
function getUserLikeProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            throw new Error("user not found");
        }
        const { id: userId } = req.user;
        console.log("userId:", userId);
        const products = yield productService_1.default.getUserLikeProducts(userId);
        return res.status(200).send(products);
    });
}
