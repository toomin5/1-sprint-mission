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
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
const superstruct_1 = require("superstruct");
const commentsStruct_1 = require("../structs/commentsStruct");
const commentService_1 = __importDefault(require("../services/commentService"));
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, superstruct_1.create)(req.params, IdParamsStruct);
        const { content } = (0, superstruct_1.create)(req.body, commentsStruct_1.UpdateCommentBodyStruct);
        const updateComment = yield commentService_1.default.updateComment(id, content);
        return res.status(201).send(updateComment);
    });
}
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield commentService_1.default.deleteComment(id);
        return res.status(204).send({ message: "deleted" });
    });
}
