import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { postSearchableFields } from "./post.constant";
import { IPost, IPostFilters } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../users/user.model";
import { IUser } from "../users/user.interface";

const createPost = async (payload: IPost): Promise<IPost> => {
  const post = await Post.create(payload);
  const populatedPost = await post.populate("author");
  const authorId = populatedPost.author._id;

  await User.findByIdAndUpdate(authorId, {
    $push: { posts: { $each: [populatedPost._id], $position: 0 } },
  });

  return populatedPost;
};

const getAllPost = async (
  filters: IPostFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPost[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: postSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Post.find(whereConditions)
    .populate("author")
    .populate("like")
    .populate("comments")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getPostByUserId = async (author: string): Promise<IPost[] | null> => {
  const result = await Post.find({ author })
    .populate("like")
    .sort("-createdAt");
  return result;
};

const deletePostById = async (id: string): Promise<IUser | null> => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  const authorId = post.author;
  await Post.findByIdAndDelete(id);
  const result = await User.findByIdAndUpdate(authorId, {
    $pull: { posts: id },
  });
  return result;
};

const toggleLike = async (
  postId: string,
  userId: string
): Promise<IPost | null> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const userIndex = post?.like?.indexOf(userId);
  if (userIndex === -1) {
    // User hasn't liked the post, so add the like
    post?.like?.push(userId);
  } else {
    // User has liked the post, so remove the like
    post?.like?.splice(userIndex, 1);
  }

  await post.save();
  return post;
};

const getPostById = async (id: string): Promise<IPost | null> => {
  const result = await Post.findOne({ _id: id })
    .populate("author")
    .populate("like")
    .populate("comments");
  return result;
};

export const PostService = {
  createPost,
  getAllPost,
  getPostByUserId,
  deletePostById,
  toggleLike,
  getPostById,
};
