import { IPost } from "../post/post.interface";
import { Post } from "../post/post.model";
import { IComment } from "./comment.interfaces";
import { Comment } from "./comment.model";

const createComment = async (payload: IComment): Promise<IComment> => {
  const comment = await Comment.create(payload);
  const commentId = comment._id;
  const postId = comment.postId;
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: { $each: [commentId], $position: 0 } },
  });
  return comment;
};

const deleteCommentById = async (id: string): Promise<IPost | null> => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("comment not found");
  }
  const postId = comment.postId;
  await Comment.findByIdAndDelete(id);
  const result = await Post.findByIdAndUpdate(postId, {
    $pull: { comments: id },
  });
  return result;
};

export const CommentService = {
  createComment,
  deleteCommentById,
};
