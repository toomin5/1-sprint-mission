import commentRepository from "../repositories/commentRepository.js";

async function updateComment(id, content) {
  const existingComment = await commentRepository.getCommentById(id);
  if (!existingComment) {
    const error = new Error("comment not found");
    error.code = 404;
    throw error;
  }

  return await commentRepository.updateComment(id, content);
}

async function deleteComment(id) {
  const existingComment = await commentRepository.getCommentById(id);
  if (!existingComment) {
    const error = new Error("comment not found");
    error.code = 404;
    throw error;
  }

  await commentRepository.deleteComment(id);
}

export default {
  updateComment,
  deleteComment,
};
