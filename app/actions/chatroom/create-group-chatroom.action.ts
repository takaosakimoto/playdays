import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { ICreateGroupChatroomRequest } from '../../interfaces';
import { Chatroom } from '../../models';
import { ChatroomEndpoint } from '../../endpoints';
import { ChatroomStore } from '../../stores';


@Injectable()
export class CreateGroupChatroomAction extends Action<ICreateGroupChatroomRequest, Chatroom> {

  constructor(
    private _chatroomEndpoint: ChatroomEndpoint,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(params: ICreateGroupChatroomRequest): void {
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
