import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { conversationService } from "./conversation.service";
import sendResponse from "../../../shared/sendResponse";
import { IConversation } from "./conversation.interface";
import httpStatus from "http-status";

const createConversation = catchAsync(async (req: Request, res: Response) => {
  const { ...conversationData } = req.body;
  const result = await conversationService.createConversation(conversationData);
  sendResponse<IConversation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "conversation created successfully",
    data: result,
  });
});

export const ConversationController = {
  createConversation,
};
