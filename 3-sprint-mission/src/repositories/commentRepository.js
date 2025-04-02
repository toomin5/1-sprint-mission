import { prismaClient } from "../lib/prismaClient.js";

async function getCommentById(id) {
  return await prismaClient.comment.findUnique({ where: { id } });
}

async function updateComment(id, content) {
  return await prismaClient.comment.update({
    where: { id },
    data: { content },
  });
}

async function deleteComment(id) {
  return await prismaClient.comment.delete({ where: { id } });
}

export default {
  getCommentById,
  updateComment,
  deleteComment,
};
