import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PostService } from "./post.service";
import { IPost } from "./post.interface";
import { Request, Response } from "express";

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

export const PostController = {
  createPost,
};
