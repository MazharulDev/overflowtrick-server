"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = void 0;
const zod_1 = require("zod");
const createCommentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string({
            required_error: "comment is required",
        }),
        author: zod_1.z.string({
            required_error: "author id is required",
        }),
        postId: zod_1.z.string({
            required_error: "postId id is required",
        }),
    }),
});
exports.CommentValidation = {
    createCommentZodSchema,
};
