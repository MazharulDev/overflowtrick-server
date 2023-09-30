/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IPost } from "../post/post.interface";

export type IUser = {
  name: string; //embedded object
  email: string;
  password: string;
  role: string;
  phoneNumber?: string;
  bio?: string;
  image?: string;
  username: string;
  posts?: Types.ObjectId | IPost;
  id?: string | null;
  _id?: string | null;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, "email" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
