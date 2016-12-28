export interface ICreatePrivateEventRequest {
  name: string;
  date: number;
  from: number;
  place_id: number;
  invited_consumer_ids: Array<number>;
}
