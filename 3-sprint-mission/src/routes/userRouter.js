import express from "express";
import { withAsync } from "../middleware/withAsync.js";
import {
  createUser,
  getUser,
  refreshToken,
  getUserInfo,
  patchUser,
  getUserProducts,
  patchUserPassword,
} from "../controllers/userController.js";
import { verifyAccessToken, verifyRefreshToken } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/", withAsync(createUser));
userRouter.post("/login", withAsync(getUser));
userRouter.post("/token/refresh", verifyRefreshToken, withAsync(refreshToken));
userRouter.get("/info", verifyAccessToken, withAsync(getUserInfo));
userRouter.get("/products", verifyAccessToken, withAsync(getUserProducts));
userRouter.patch("/patch", verifyAccessToken, withAsync(patchUser));
userRouter.patch("/pwdPatch", verifyAccessToken, withAsync(patchUserPassword));

export default userRouter;
