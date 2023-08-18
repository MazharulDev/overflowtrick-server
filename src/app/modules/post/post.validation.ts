import { z } from "zod";

const createPostZodSchema = z.object({
  body: z.object({
    post: z.string({
      required_error: "post is required",
    }),
    name: z.string({
      required_error: "name is required",
    }),
    username: z.string({
      required_error: "username is required",
    }),
    image: z.string().optional(),
  }),
});

export const PostValidation = {
  createPostZodSchema,
};
