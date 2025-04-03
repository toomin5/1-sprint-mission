import { Request, Response } from "express";
import commentService from "../services/commentService";

export async function updateComment(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const { content } = req.body;

  const updateComment = await commentService.updateComment(id, content);
  return res.status(201).send(updateComment);
}

export async function deleteComment(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  await commentService.deleteComment(id);

  return res.status(204).send({ message: "deleted" });
}
