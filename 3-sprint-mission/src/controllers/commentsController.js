import { create } from "superstruct";
import { prismaClient } from "../lib/prismaClient.js";
import { UpdateCommentBodyStruct } from "../structs/commentsStruct.js";

export async function updateComment(req, res) {
  const { id } = create(req.params, IdParamsStruct);
  const { content } = create(req.body, UpdateCommentBodyStruct);

  const existingComment = await prismaClient.comment.findUnique({
    where: { id },
  });
  if (!existingComment) {
    const error = new Error("comment not found");
    error.code = 404;
    throw error;
  }

  const updatedComment = await prismaClient.comment.update({
    where: { id },
    data: { content },
  });

  return res.send(updatedComment);
}

export async function deleteComment(req, res) {
  const { id } = create(req.params, IdParamsStruct);

  const existingComment = await prismaClient.comment.findUnique({
    where: { id },
  });
  if (!existingComment) {
    const error = new Error("comment not found");
    error.code = 404;
    throw error;
  }

  await prismaClient.comment.delete({ where: { id } });

  return res.status(204).send();
}
