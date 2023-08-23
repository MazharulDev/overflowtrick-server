import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CommentService } from "./comment.service";
import sendResponse from "../../../shared/sendResponse";
import { IComment } from "./comment.interfaces";
import httpStatus from "http-status";

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

export const CommentController = {
  createComment,
};
