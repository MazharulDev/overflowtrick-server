import mongoose, { Schema, model } from "mongoose";
import { ConversationModel, IConversation } from "./conversation.interface";

export const ConversationSchema = new Schema<IConversation, ConversationModel>(
  {
    members: {
      senderId: mongoose.Types.ObjectId,
      receiverId: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Conversation = model<IConversation, ConversationModel>(
  "Conversation",
  ConversationSchema
);
