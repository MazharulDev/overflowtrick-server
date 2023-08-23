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

export const CommentService = {
  createComment,
};
