import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (payload: IPost): Promise<IPost> => {
  const result = await Post.create(payload);
  return result;
};

export const PostService = {
  createPost,
};
