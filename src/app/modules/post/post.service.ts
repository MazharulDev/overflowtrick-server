import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { postSearchableFields } from "./post.constant";
import { IPost, IPostFilters } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../users/user.model";

const createPost = async (payload: IPost): Promise<IPost> => {
  const post = await Post.create(payload);
  const populatedPost = await post.populate("author");
  await User.findByIdAndUpdate(payload.author, {
    $push: { posts: populatedPost?._id },
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

const getPostByUsername = async (username: string): Promise<IPost[] | null> => {
  const result = await Post.find({ username }).sort("-createdAt");
  return result;
};

export const PostService = {
  createPost,
  getAllPost,
  getPostByUsername,
};
