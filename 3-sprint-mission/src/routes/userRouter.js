import express from "express";
import { withAsync } from "../lib/withAsync.js";
import { createUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", withAsync(createUser));

export default userRouter;
