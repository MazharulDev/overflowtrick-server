"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const createPostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string({
            required_error: "post is required",
        }),
        author: zod_1.z.string({
            required_error: "author id is required",
        }),
        like: zod_1.z.string().optional(),
        comments: zod_1.z.string().optional(),
    }),
});
exports.PostValidation = {
    createPostZodSchema,
};
