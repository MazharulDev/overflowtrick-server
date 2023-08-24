"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postroutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const post_validation_1 = require("./post.validation");
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
router.post("/create-post", (0, validateRequest_1.default)(post_validation_1.PostValidation.createPostZodSchema), post_controller_1.PostController.createPost);
router.get("/", post_controller_1.PostController.getAllPosts);
router.delete("/delete/:id", post_controller_1.PostController.deletePostById);
router.post("/like/:id", post_controller_1.PostController.toggleLike);
router.get("/post/:id", post_controller_1.PostController.getPostById);
router.get("/:userId", post_controller_1.PostController.getPostByUserId);
exports.Postroutes = router;
