import { IConversation } from "./conversation.interface";
import { Conversation } from "./conversation.model";

const createConversation = async (
  payload: IConversation
): Promise<IConversation> => {
  const conversation = await Conversation.create(payload);

  return conversation;
};

export const conversationService = {
  createConversation,
};
