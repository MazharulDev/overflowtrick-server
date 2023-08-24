"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const post_model_1 = require("../post/post.model");
const comment_model_1 = require("./comment.model");
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.Comment.create(payload);
    const commentId = comment._id;
    const postId = comment.postId;
    yield post_model_1.Post.findByIdAndUpdate(postId, {
        $push: { comments: { $each: [commentId], $position: 0 } },
    });
    return comment;
});
const deleteCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.Comment.findById(id);
    if (!comment) {
        throw new Error("comment not found");
    }
    const postId = comment.postId;
    yield comment_model_1.Comment.findByIdAndDelete(id);
    const result = yield post_model_1.Post.findByIdAndUpdate(postId, {
        $pull: { comments: id },
    });
    return result;
});
exports.CommentService = {
    createComment,
    deleteCommentById,
};
