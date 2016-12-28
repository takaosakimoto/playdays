import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { IUpdateChatParticipationRequest } from '../../interfaces';
import { ChatParticipation, Chatroom } from '../../models';
import { ChatParticipationEndpoint } from '../../endpoints';
import { ChatroomStore } from '../../stores';
import * as _ from 'lodash';

@Injectable()
export class UpdateChatParticipationAction extends Action<IUpdateChatParticipationRequest, ChatParticipation> {

  constructor(
    private _chatParticipationEndpoint: ChatParticipationEndpoint,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(request: IUpdateChatParticipationRequest): void {
    this._chatParticipationEndpoint.update(request.id, request.params)
      .subscribe(
        (cp: ChatParticipation): void => {
          let chatroomId = cp.chatroomId;
          this._chatroomStore.chatroom$(chatroomId).first().subscribe((cm: Chatroom) => {
            let newChatroom = _.clone(cm);
            newChatroom.unreadCount = 0;
            this._chatroomStore.saveOne(newChatroom);
          });
        },
        e => this.error$.next(e)
      );
  }
}
