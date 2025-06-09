import express from "express";
import { withAsync } from "../lib/withAsync";
import { uploadImage } from "../controllers/imagesController";
import { upload } from "../services/imageService";

const imagesRouter = express.Router();

imagesRouter.post("/upload", upload.single("image"), withAsync(uploadImage));

export default imagesRouter;
