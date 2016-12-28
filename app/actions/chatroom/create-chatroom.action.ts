import { Injectable } from '@angular/core';

import { Action } from '../../engine/action';
import { ICreateChatroomRequest } from '../../interfaces';
import { Chatroom } from '../../models';
import { ChatroomEndpoint } from '../../endpoints';
import { ChatroomStore } from '../../stores';


@Injectable()
export class CreateChatroomAction extends Action<ICreateChatroomRequest, Chatroom> {

  constructor(
    private _chatroomEndpoint: ChatroomEndpoint,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(params: ICreateChatroomRequest): void {
    this._chatroomEndpoint.create(params)
      .subscribe(
        (c: Chatroom): void => {
          this._chatroomStore.saveOne(c);
          this.success$.next(c);
        },
        e => this.error$.next(e)
      );
  }
}
