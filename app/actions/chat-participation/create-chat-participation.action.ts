import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { ICreateChatParticipationRequest } from '../../interfaces';
import { ChatParticipation, Chatroom } from '../../models';
import { ChatParticipationEndpoint } from '../../endpoints';
import { ChatroomStore } from '../../stores';
import * as _ from 'lodash';

@Injectable()
export class CreateChatParticipationAction extends Action<ICreateChatParticipationRequest, ChatParticipation> {

  constructor(
    private _chatParticipationEndpoint: ChatParticipationEndpoint,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(request: ICreateChatParticipationRequest): void {
    this._chatParticipationEndpoint.create(request)
      .subscribe(
        (cp: ChatParticipation) => {
          let chatroomId = cp.chatroomId;
          this._chatroomStore.chatroom$(chatroomId).first().subscribe((cm: Chatroom) => {
            let newChatroom = _.clone(cm);
            const chatParticipations = _['concat'](cm.chatParticipations, cp);
            newChatroom.chatParticipations = chatParticipations;
            this._chatroomStore.saveOne(newChatroom);
          });
          this.success$.next(cp);
        },
        e => this.error$.next(e)
      );
  }
}
