import { create } from "superstruct";
import { prismaClient } from "../lib/prismaClient.js";
import { UpdateCommentBodyStruct } from "../structs/commentsStruct.js";
import commentService from "../services/commentService.js";

export async function updateComment(req, res) {
  const { id } = create(req.params, IdParamsStruct);
  const { content } = create(req.body, UpdateCommentBodyStruct);

  const updateComment = await commentService.updateComment(id, content);
  return res.status(201).send(updateComment);
}

export async function deleteComment(req, res) {
  const { id } = req.params;

  await commentService.deleteComment(id);

  return res.status(204).send({ message: "deleted" });
}
