/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IPost = {
  post: string;
  name: string;
  username: string;
  image?: string;
};

export type PostModel = Model<IPost, Record<string, unknown>>;
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IPostFilters = {
  searchTerm?: string;
  name?: string;
};
