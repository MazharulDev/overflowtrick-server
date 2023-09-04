import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { userSearchableFields } from "./user.constant";
import { IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";
import { IPost } from "../post/post.interface";
import { Post } from "../post/post.model";
import { Comment } from "../comment/comment.model";

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
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

  const result = await User.find(whereConditions)
    .populate("posts")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email }).populate("posts");
  return result;
};

const getUserByUsername = async (username: string): Promise<IUser | null> => {
  const result = await User.findOne({ username }).populate("posts");
  return result;
};

const getCommentNotification = async (
  userId: string
): Promise<IPost[] | null> => {
  const userAllPosts = await Post.find({ author: userId });
  let allComments: string[] = [];
  userAllPosts.forEach((post) => {
    allComments = allComments.concat(post.comments);
  });
  const replies = await Comment.find({
    _id: { $in: allComments },
    author: { $ne: userId },
  })
    .populate("author")
    .sort("-createdAt");
  return replies;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserByUsername,
  getCommentNotification,
};
