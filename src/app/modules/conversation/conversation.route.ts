import express from "express";
import { ConversationController } from "./conversation.controller";
const router = express.Router();

router.post("/create-conversaton", ConversationController.createConversation);

export const conversationRoutes = router;
