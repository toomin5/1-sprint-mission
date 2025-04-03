import express from "express";
import { withAsync } from "../middleware/withAsync";
import { upload, uploadImage } from "../controllers/imagesController";

const imagesRouter = express.Router();

imagesRouter.post("/upload", upload.single("image"), withAsync(uploadImage));

export default imagesRouter;
