import { z } from "zod";

const createPostZodSchema = z.object({
  body: z.object({
    post: z.string({
      required_error: "post is required",
    }),
    userName: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    image: z.string().optional(),
  }),
});

export const PostValidation = {
  createPostZodSchema,
};
