import express from "express";
import { CommentController } from "./comment.controller";
const router = express.Router();

router.post("/:postId", CommentController.createComment);

export const commentRoutes = router;
