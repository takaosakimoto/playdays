import { Injectable } from '@angular/core';
import { ChatroomChannel } from '../../channels';
import { Chatroom, ChatMessage } from '../../models';
import { ChatroomStore } from '../../stores';
import { Action } from '../../engine/action';
import { MeStore } from '../../stores';
import * as _ from 'lodash';

interface Request {
  consumerId: number;
  chatroomId: number;
}

@Injectable()
export class SubscribeNewChatMessageCreatedNotificationAction extends Action<Request, ChatMessage> {

  constructor(
    private _chatroomChannel: ChatroomChannel,
    private _meStore: MeStore,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(params: Request) {
    let consumerId = params.consumerId;
    const topic = `consumer_chatrooms:${params.chatroomId}`;
    const eventName = 'chatroom:new_message_created';
    this._chatroomChannel.join(topic, {consumer_id: consumerId})
      .filter(o => o)
      .flatMap(o => this._chatroomChannel.subscribe(topic, eventName))
      .subscribe(
        (rf: ChatMessage) => {
          console.debug('ChatroomChannel new chat message created', rf);
          let chatMessage = new ChatMessage(rf);
          let chatParticipationId = chatMessage.chatParticipationId;
          this._chatroomStore.chatroomByParticipationId$(chatParticipationId).first().subscribe((c: Chatroom) => {
            if (chatMessage.chatParticipation.consumerId !== consumerId) {
              let newChatroom = _.clone(c);
              newChatroom.chatMessages.push(chatMessage);
              newChatroom.lastChatMessage = chatMessage;
              newChatroom.unreadCount += 1;
              this._chatroomStore.saveOne(newChatroom);
            }
            this.success$.next(rf);
          });
        },
        reason => console.error('FAILED to connect to ChatroomChannel', reason)
      );
  }
}
