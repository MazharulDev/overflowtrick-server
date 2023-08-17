import { Schema, model } from "mongoose";
import { IPost, PostModel } from "./post.interface";

export const PostSchema = new Schema<IPost, PostModel>(
  {
    post: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Post = model<IPost, PostModel>("Post", PostSchema);
