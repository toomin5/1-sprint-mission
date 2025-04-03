import commentRepository from "../repositories/commentRepository";

async function updateComment(id: number, content: string) {
  const existingComment = await commentRepository.getCommentById(id);
  if (!existingComment) {
    throw new Error("comment not found");
  }

  return await commentRepository.updateComment(id, content);
}

async function deleteComment(id: number) {
  const existingComment = await commentRepository.getCommentById(id);
  if (!existingComment) {
    throw new Error("comment not found");
  }

  await commentRepository.deleteComment(id);
}

export default {
  updateComment,
  deleteComment,
};
