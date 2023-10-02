import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

export const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    image: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
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

export const User = model<IUser, UserModel>("User", UserSchema);
