export interface IUpdateChatParticipationRequest {
  id: number;
  params: {
    last_read_chat_message_id: number;
  };
}

export interface ICreateChatParticipationRequest {
  chatroom_id: number;
  consumer_id: number;
}
