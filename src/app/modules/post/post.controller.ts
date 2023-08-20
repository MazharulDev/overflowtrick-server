import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PostService } from "./post.service";
import { IPost } from "./post.interface";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { postFilterableFields } from "./post.constant";
import { paginationFields } from "../../../constants/pagination";
import { IUser } from "../users/user.interface";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { ...postData } = req.body;
  const result = await PostService.createPost(postData);
  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "post created successfully",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, postFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PostService.getAllPost(filters, paginationOptions);

  sendResponse<IPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All post retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getPostByUsername = catchAsync(async (req: Request, res: Response) => {
  const username = req.params.username;

  const result = await PostService.getPostByUsername(username);

  sendResponse<IPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get post by username retrieved successfully !",
    data: result,
  });
});

const deletePostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PostService.deletePostById(id);

  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "delete post successfully !",
    data: result,
  });
});

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  const result = await PostService.toggleLike(postId, userId);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get post by username retrieved successfully !",
    data: result,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getPostByUsername,
  deletePostById,
  toggleLike,
};
