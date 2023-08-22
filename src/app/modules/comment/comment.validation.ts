import { z } from "zod";

const createCommentZodSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: "comment is required",
    }),
    author: z.string({
      required_error: "author id is required",
    }),
  }),
});

export const CommentValidation = {
  createCommentZodSchema,
};
