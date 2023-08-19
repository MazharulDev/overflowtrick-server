/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IUser } from "../users/user.interface";

export type IPost = {
  text: string;
  author: Types.ObjectId | IUser;
  like?: { type: string; ref: string }[];
  comments?: { text: string; commenter: Types.ObjectId | IUser }[];
};

export type PostModel = Model<IPost, Record<string, unknown>>;
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IPostFilters = {
  searchTerm?: string;
  name?: string;
};
