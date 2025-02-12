import { Model, Types } from "mongoose";

export type IConversation = {
  members: {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
  };
};

export type ConversationModel = Model<IConversation, Record<string, unknown>>;

export type IConversationFilters = {
  searchTerm?: string;
  name?: string;
};
