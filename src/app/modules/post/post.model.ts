import mongoose, { Schema, model } from "mongoose";
import { IPost, PostModel } from "./post.interface";

export const PostSchema = new Schema<IPost, PostModel>(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Post = model<IPost, PostModel>("Post", PostSchema);
