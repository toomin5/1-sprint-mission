import express from "express";
import { withAsync } from "../lib/withAsync.js";
import { createUser, getUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", withAsync(createUser));
userRouter.post("/login", withAsync(getUser));

export default userRouter;
