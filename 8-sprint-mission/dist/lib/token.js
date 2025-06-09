"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = generateTokens;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
function generateTokens(userId) {
    const accessToken = jsonwebtoken_1.default.sign({ id: userId }, constants_1.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: userId }, constants_1.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    return { accessToken, refreshToken };
}
function verifyAccessToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, constants_1.JWT_ACCESS_TOKEN_SECRET);
    if (typeof decoded === 'string') {
        throw new Error('Invalid token');
    }
    return { userId: decoded.id };
}
function verifyRefreshToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, constants_1.JWT_REFRESH_TOKEN_SECRET);
    if (typeof decoded === 'string') {
        throw new Error('Invalid token');
    }
    return { userId: decoded.id };
}
