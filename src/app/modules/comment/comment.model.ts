import mongoose, { Schema, model } from "mongoose";
import { CommentModel, IComment } from "./comment.interfaces";

export const CommentSchema = new Schema<IComment, CommentModel>(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Comment = model<IComment, CommentModel>("Comment", CommentSchema);
