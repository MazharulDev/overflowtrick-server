/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IUser = {
  name: string; //embedded object
  email: string;
  image?: string;
  username: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
