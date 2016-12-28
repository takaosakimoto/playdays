export interface ICreateChatroomRequest {
  consumer_id: number;
}

export interface ICreateGroupChatroomRequest {
  name: string;
  consumer_ids: Array<number>;
}
