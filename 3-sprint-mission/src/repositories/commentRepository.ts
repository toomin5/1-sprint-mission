import { prismaClient } from "../lib/prismaClient";

async function getCommentById(id: number) {
  return await prismaClient.comment.findUnique({ where: { id } });
}

async function updateComment(id: number, content: string) {
  return await prismaClient.comment.update({
    where: { id },
    data: { content },
  });
}

async function deleteComment(id: number) {
  return await prismaClient.comment.delete({ where: { id } });
}

export default {
  getCommentById,
  updateComment,
  deleteComment,
};
