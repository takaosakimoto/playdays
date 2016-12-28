import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { ChatParticipation } from './chat-participation.model';
import { ChatMessage } from './chat-message.model';

export class Chatroom extends ModelBase<Chatroom> {

  public id: number;
  public name: string;
  public isGroupChat: boolean;
  public chatParticipations: Array<ChatParticipation>;
  public chatMessages: Array<ChatMessage>;
  public lastChatMessage: ChatMessage;
  public lastChatMessageInsertedAt: Date;
  public unreadCount: number;
  public insertedAt: Date;
  public updatedAt: Date;
  public pictureUrl: string;

  deserializeFromJson(json: any): Chatroom {
    let fb_user_id = _.get(json, 'fb_user_id', '');
    this.id = _.get(json, 'id', 0);
    this.name = _.get(json, 'name', '');
    this.isGroupChat = _.get(json, 'is_group_chat', false);
    this.chatParticipations = _.get(json, 'chat_participations', []).map(cp => new ChatParticipation(cp));
    let chatMessages = _.get(json, 'chat_messages', []);
    chatMessages.sort((a, b) => a.id - b.id);
    this.chatMessages = chatMessages.map(cm => new ChatMessage(cm));
    if (chatMessages.length > 0) {
      let cm = chatMessages[chatMessages.length - 1];
      this.lastChatMessage = new ChatMessage(cm);
      this.lastChatMessageInsertedAt = this.lastChatMessage.insertedAt;
    }
    this.unreadCount = _.get(json, 'unread_count', 0);

    // should checkout if
    if (this.isGroupChat) {
      this.pictureUrl = 'img/logo.jpg';
    } else {
      this.pictureUrl = `https://graph.facebook.com/v2.6/${fb_user_id}/picture?height=300`;
    }

    _.each(this.chatMessages, (message) => {
      let chatParticipation = _.find(this.chatParticipations, (c) => c.id === message.chatParticipationId);
      message.fbUserPictureUrl = chatParticipation.consumer.fbUserPictureUrl;
    });

    return this;
  }
}
