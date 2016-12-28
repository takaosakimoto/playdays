import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { ICreateChatMessageRequest } from '../../interfaces';
import { ChatMessage } from '../../models';
import { ChatroomStore } from '../../stores';
import { ChatMessageEndpoint } from '../../endpoints';
import * as _ from 'lodash';

@Injectable()
export class CreateChatMessageAction extends Action<ICreateChatMessageRequest, ChatMessage> {

  constructor(
    private _chatMessageEndpoint: ChatMessageEndpoint,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(params: ICreateChatMessageRequest): void {
    let chatroomId = params.chatroom_id;

    this._chatMessageEndpoint.create(params)
      .subscribe(
        (cm: ChatMessage): void => {
          this._chatroomStore.chatroom$(chatroomId).first().subscribe(
            (c): void => {
              let newChatroom = _.clone(c);
              newChatroom.chatMessages.push(cm);
              newChatroom.lastChatMessage = cm;
              this._chatroomStore.saveOne(newChatroom);
            });
          this.success$.next(cm);
        },
        e => this.error$.next(e)
      );
  }
}
