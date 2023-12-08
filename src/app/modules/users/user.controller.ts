import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constants/pagination";
import { IPost } from "../post/post.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await UserService.getSingleUser(email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single User retrieved successfully !",
    data: result,
  });
});

const getUserByUsername = catchAsync(async (req: Request, res: Response) => {
  const username = req.params.username;

  const result = await UserService.getUserByUsername(username);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single User retrieved successfully !",
    data: result,
  });
});

const getCommentNotification = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await UserService.getCommentNotification(userId);

    sendResponse<IPost[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your post comment Notification retrieved successfully !",
      data: result,
    });
  }
);

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload.userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update your profile",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserByUsername,
  getCommentNotification,
  updateUser,
  deleteUser,
};
