import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PostService } from "./post.service";
import { IPost } from "./post.interface";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { postFilterableFields } from "./post.constant";
import { paginationFields } from "../../../constants/pagination";

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

const getPostByEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await PostService.getPostByEmail(email);

  sendResponse<IPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get post by email retrieved successfully !",
    data: result,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getPostByEmail,
};
