import { z } from "zod";

const createPostZodSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: "post is required",
    }),
    author: z.string({
      required_error: "author id is required",
    }),
    like: z.string().optional(),
    comments: z.string().optional(),
  }),
});

export const PostValidation = {
  createPostZodSchema,
};
