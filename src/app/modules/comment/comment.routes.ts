import express from "express";
import { CommentController } from "./comment.controller";
const router = express.Router();

router.post("/", CommentController.createComment);
router.delete("/:id", CommentController.deleteCommentById);

export const commentRoutes = router;
