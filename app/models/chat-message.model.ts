import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { ChatParticipation } from './chat-participation.model';


export class ChatMessage extends ModelBase<ChatMessage> {

  public id: number;
  public textContent: string;
  public chatParticipationId: number;
  public chatParticipation: ChatParticipation;
  public fbUserPictureUrl: string;
  public insertedAt: Date;
  public updatedAt: Date;

  deserializeFromJson(json: any): ChatMessage {
    this.id = _.get(json, 'id', 0);
    this.textContent = _.get(json, 'text_content', '');
    this.chatParticipationId = _.get(json, 'chat_participation_id', 0);
    let chatParticipation = _.get(json, 'chat_participation', null);
    if (chatParticipation) {
      this.chatParticipation = new ChatParticipation(chatParticipation);
      this.fbUserPictureUrl = this.chatParticipation.consumer.fbUserPictureUrl;
    }

    const insertedAt = _.get(json, 'inserted_at', '');
    const updatedAt = _.get(json, 'updated_at', '');
    this.insertedAt = insertedAt && new Date(String(insertedAt));
    this.updatedAt = updatedAt && new Date(String(updatedAt));
    return this;
  }
}
