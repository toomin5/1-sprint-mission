import express from "express";
import { withAsync } from "../middleware/withAsync.js";
import {
  createUser,
  getUser,
  refreshToken,
} from "../controllers/userController.js";
import { verifyRefreshToken } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/", withAsync(createUser));
userRouter.post("/login", withAsync(getUser));
userRouter.post("/token/refresh", verifyRefreshToken, withAsync(refreshToken));

export default userRouter;
