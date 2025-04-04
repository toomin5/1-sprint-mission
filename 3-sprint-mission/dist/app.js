"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./lib/constants");
const articlesRouter_1 = __importDefault(require("./routes/articlesRouter"));
const productsRouter_1 = __importDefault(require("./routes/productsRouter"));
const commentsRouter_1 = __importDefault(require("./routes/commentsRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(constants_1.STATIC_PATH, express_1.default.static(path_1.default.resolve(process.cwd(), constants_1.PUBLIC_PATH)));
app.use("/articles", articlesRouter_1.default);
app.use("/products", productsRouter_1.default);
app.use("/comments", commentsRouter_1.default);
app.use("/users", userRouter_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(constants_1.PORT, () => {
    console.log(`Server started on port ${constants_1.PORT}`);
});
