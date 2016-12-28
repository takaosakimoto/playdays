import * as _ from 'lodash';
import { ModelBase } from '../engine/model';

export class ChatParticipation extends ModelBase<ChatParticipation> {

  public id: number;
  public chatroomId: number;
  public consumerId: number;
  public lastReadChatMessageId: number;
  public consumer: {
    id: number
    name: string;
    fbUserPictureUrl: string;
  };

  deserializeFromJson(json: any): ChatParticipation {
    this.id = _.get(json, 'id', 0);
    this.chatroomId = _.get(json, 'chatroom_id', 0);
    this.consumerId = _.get(json, 'consumer_id', 0);
    this.lastReadChatMessageId = _.get(json, 'last_read_chat_message_id', 0);
    this.consumer = {
      id: _.get(json, 'consumer.id', 0),
      name: _.get(json, 'consumer.name', ''),
      fbUserPictureUrl: 'https://graph.facebook.com/v2.6/' + _.get(json, 'consumer.fb_user_id', '') +'/picture?height=100',
    };

    return this;
  }
}
