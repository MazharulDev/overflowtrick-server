/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type IComment = {
  _id: string;
  text: string;
  author: {
    type: Types.ObjectId;
    _id: Types.ObjectId;
  };
  postId: {
    type: Types.ObjectId;
    _id: Types.ObjectId;
  };
};

export type CommentModel = Model<IComment, Record<string, unknown>>;
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
