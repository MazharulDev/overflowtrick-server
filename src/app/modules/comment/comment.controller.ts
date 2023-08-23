import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CommentService } from "./comment.service";
import sendResponse from "../../../shared/sendResponse";
import { IComment } from "./comment.interfaces";
import httpStatus from "http-status";
import { IPost } from "../post/post.interface";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const result = await CommentService.createComment(commentData);
  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "comment created successfully",
    data: result,
  });
});

const deleteCommentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CommentService.deleteCommentById(id);

  sendResponse<IPost | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "delete comment successfully !",
    data: result,
  });
});

export const CommentController = {
  createComment,
  deleteCommentById,
};
