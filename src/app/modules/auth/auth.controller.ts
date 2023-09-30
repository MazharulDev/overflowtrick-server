import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginUser(loginData);

  const { refreshToken } = result;

  // set refresh token into cookies
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User loggedin successfully !",
    data: result,
  });
});

export const authController = {
  loginUser,
};
