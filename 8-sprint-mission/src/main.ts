import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { PORT, PUBLIC_PATH, STATIC_PATH } from "./lib/constants";
import articlesRouter from "./routers/articlesRouter";
import productsRouter from "./routers/productsRouter";
import commentsRouter from "./routers/commentsRouter";
import imagesRouter from "./routers/imagesRouter";
import authRouter from "./routers/authRouter";
import usersRouter from "./routers/usersRouter";
import notificationRouter from "./routers/notificationsRouter";
import http from "http";
import { setupSocket } from "./services/socketService";
import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from "./controllers/errorController";

const app = express();
const server = http.createServer(app);

setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(STATIC_PATH, express.static(path.resolve(process.cwd(), PUBLIC_PATH)));

app.use("/articles", articlesRouter);
app.use("/products", productsRouter);
app.use("/comments", commentsRouter);
app.use("/images", imagesRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/notifications", notificationRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

// server.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

export default app;
