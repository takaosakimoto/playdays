export interface IIndexCommentRequest {
  event_id?: number;
  trial_class_id?: number;
  place_id?: number;
}

export interface ICreateCommentRequest {
  text_content: string;
  event_id?: number;
  trial_class_id?: number;
  place_id?: number;
}
