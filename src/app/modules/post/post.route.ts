import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidation } from "./post.validation";
import { PostController } from "./post.controller";
const router = express.Router();

router.post(
  "/create-post",
  validateRequest(PostValidation.createPostZodSchema),
  PostController.createPost
);

router.get("/", PostController.getAllPosts);
router.delete("/delete/:id", PostController.deletePostById);
router.post("/like/:id", PostController.toggleLike);

router.get("/post/:id", PostController.getPostById);

router.get("/:userId", PostController.getPostByUserId);

export const Postroutes = router;
