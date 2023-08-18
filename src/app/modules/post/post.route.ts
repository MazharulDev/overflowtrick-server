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

router.get("/:username", PostController.getPostByUsername);

export const Postroutes = router;