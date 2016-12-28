import { Injectable } from '@angular/core';
import { Chatroom } from '../../models';
import { ChatroomEndpoint } from '../../endpoints';
import { ChatroomStore } from '../../stores';
import { Action } from '../../engine/action';

@Injectable()
export class GetOneChatroomAction extends Action<number, Chatroom> {

  constructor(
    private _chatroomEndpoint: ChatroomEndpoint,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(id: number) {
    this._chatroomEndpoint.fetchSingle(id)
      .subscribe(
        (c: Chatroom): void => {
          this._chatroomStore.upsertOne(c);
          this.success$.next(c);
        },
        e => this.error$.next(e)
      );
  }
}
