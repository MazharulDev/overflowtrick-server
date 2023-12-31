/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IPost } from "../post/post.interface";

export type IUser = {
  name: string; //embedded object
  email: string;
  image?: string;
  role: string;
  phoneNumber: string;
  bio: string;
  username: string;
  posts?: Types.ObjectId | IPost;
  id?: string | null;
  _id?: string | null;
};
export type UserModel = Model<IUser, Record<string, unknown>>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
