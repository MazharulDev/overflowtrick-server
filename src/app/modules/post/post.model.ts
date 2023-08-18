import { Schema, model } from "mongoose";
import { IPost, PostModel } from "./post.interface";

export const PostSchema = new Schema<IPost, PostModel>(
  {
    post: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
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
